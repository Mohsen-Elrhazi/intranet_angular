import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { TeacherService } from '../../services/teacher.service';
import { CreateTeacherRequest } from '../../models/create-teacher-request.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-teacher-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzDividerModule,
    NzUploadModule,
  ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef); // C'est la télécommande de la modale
  private teacherService = inject(TeacherService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9 ]*$')]],
      specialization: ['', [Validators.required]],
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
    return false; // Empêche l'envoi auto
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

    const values: CreateTeacherRequest = this.validateForm.value;

    const formData = new FormData();

    formData.append('firstName', values.firstName); // ou formData.append('firstName', this.validateForm.value.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('specialization', values.specialization);

    const files = this.fileList();
    if (files.length > 0) {
      formData.append('profileImage', files[0] as any);
    }

    this.teacherService.createTeacher(formData).subscribe({
      next: (response) => {
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
