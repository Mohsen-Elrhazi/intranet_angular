import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { DepartmentService } from '../../services/department.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartmentRequest } from '../../models/create-department-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateDepartmentRequest } from '../../models/update-department-request.model';

@Component({
  selector: 'app-department-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzIconModule, NzInputModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css',
})
export class DepartmentFormComponent {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  private departmentService = inject(DepartmentService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = signal(false);

  readonly nzModalData = inject(NZ_MODAL_DATA);
  isEditMode = false;
  departmentId?: number;

  ngOnInit() {
    this.isEditMode = !!this.nzModalData?.department;
    if (this.isEditMode) {
      this.departmentId = this.nzModalData.department.id;
    }

    this.initForm();

    if (this.isEditMode) {
      this.patchFormValues();
    }
  }

  private initForm() {
    this.validateForm = this.fb.group({
      name: ['', this.isEditMode ? [] : [Validators.required]],
      description: [''],
    });
  }

  private patchFormValues() {
    const d = this.nzModalData.department;
    this.validateForm.patchValue({
      name: d.name,
      description: d.description,
    });
  }

  envoyer() {
    if (this.validateForm.get('name')?.hasError('backendError')) {
      this.validateForm.get('name')?.setErrors(null);
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

    const formValues = this.validateForm.value;

    const request$ = this.isEditMode
      ? this.departmentService.updateDepartment(this.departmentId!, formValues)
      : this.departmentService.createDepartment(formValues);

    request$.subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.messageService.success(response.message);
        this.modalRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        // console.log('Error response:', err);
        const backendResponse = err.error;
        if (backendResponse?.errors) {
          if (backendResponse.errors.name) {
            const errorMessage = backendResponse.errors.name;
            this.validateForm.get('name')?.setErrors({ backendError: errorMessage });
            this.messageService.error(errorMessage);
          }
        } else if (backendResponse?.message) {
          this.messageService.error(backendResponse.message);
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
