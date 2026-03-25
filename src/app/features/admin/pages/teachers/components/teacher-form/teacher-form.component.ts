import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
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
  private modalRef = inject(NzModalRef);
  private teacherService = inject(TeacherService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = signal(false);

  readonly nzModalData = inject(NZ_MODAL_DATA);
  isEditMode = false;
  teacherId?: number;

  ngOnInit() {
    this.isEditMode = !!this.nzModalData?.teacher;
    if (this.isEditMode) {
      this.teacherId = this.nzModalData.teacher.id;
    }

    this.initForm();

    if (this.isEditMode) {
      this.patchFormValues();
    }
  }

  private initForm() {
    this.validateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', this.isEditMode ? [] : [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9 ]*$')]],
      specialization: ['', [Validators.required]],
    });

    if (this.isEditMode) {
      this.validateForm.get('email')?.disable();
      this.validateForm.get('password')?.disable();
    }
  }

  private patchFormValues() {
    const t = this.nzModalData.teacher;
    this.validateForm.patchValue({
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      phoneNumber: t.phoneNumber,
      specialization: t.specialization,
    });

    if (t.profileImageUrl) {
      this.fileList.set([
        {
          uid: '-1',
          name: 'Photo actuelle',
          status: 'done',
          url: t.profileImageUrl,
        },
      ]);
    }
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

  imageDeleted = false;

  handleRemove = (file: NzUploadFile): boolean => {
    this.imageDeleted = true;
    this.fileList.set([]);
    return true;
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

    this.isLoading.set(true);

    const values: CreateTeacherRequest = this.validateForm.value;

    const formData = new FormData();

    formData.append('firstName', values.firstName); // ou formData.append('firstName', this.validateForm.value.firstName);
    formData.append('lastName', values.lastName);
    
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('specialization', values.specialization);

    if (!this.isEditMode) {
      formData.append('email', values.email);
      formData.append('password', values.password);
    }

    const files = this.fileList();

    if (files.length > 0) {
      const fileCandidate = files[0].originFileObj || (files[0] as any);

      if (fileCandidate instanceof File || fileCandidate instanceof Blob) {
        formData.append('profileImage', fileCandidate);
      }
    }

    if (this.isEditMode) {
      formData.append('deleteImage', this.imageDeleted.toString());
    }

    const request$ = this.isEditMode
      ? this.teacherService.updateTeacher(this.teacherId!, formData)
      : this.teacherService.createTeacher(formData);

    request$.subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.messageService.success(response.message);
        this.modalRef.close(true);
        console.log('Enseignant créé/modifié avec succès :', response);
      },
      error: (err) => {
        this.isLoading.set(false);

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
