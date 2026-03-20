import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzUploadModule,
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef); //  télécommande de la modale
  private studentService = inject(StudentService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9 ]*$')]],
      cne: ['', [Validators.required]],
    });
  }

  fileList = signal<NzUploadFile[]>([]);

  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.onload = () => {
      file.url = reader.result as string;
      this.fileList.set([file]);
    };

    reader.readAsDataURL(file as any);
    return false;
  };

  envoyer() {
    if (this.validateForm.get('email')?.hasError('backendError')) {
      this.validateForm.get('email')?.setErrors(null);
    }

    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isLoading = true;

    const values = this.validateForm.value;

    const formData = new FormData();

    formData.append('firstName', values.firstName); // ou formData.append('firstName', this.validateForm.value.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('cne', values.cne);

    const files = this.fileList();
    if (files.length > 0) {
      formData.append('profileImage', files[0] as any);
    }

    this.studentService.createStudent(formData).subscribe({
      next: (response) => {
        console.log('Étudiant créé avec succès :', response);
        this.isLoading = false;
        this.messageService.success(response.message);
        this.modalRef.close();
      },
      error: (err) => {
        this.isLoading = false;

        if ((err.status === 400 || err.status === 409) && err.error?.errors?.email) {
          const errorMessage = err.error.errors.email;
          this.messageService.error(errorMessage);

          this.validateForm.get('email')?.setErrors({ backendError: errorMessage });
        } else {
          this.messageService.error('Une erreur est survenue. Veuillez réessayer.');
        }
      },
    });
  }

  close() {
    this.modalRef.destroy();
  }
}
