import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DepartmentService } from '../../services/department.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartmentRequest } from '../../models/create-department-request.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
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

    const request: CreateDepartmentRequest = this.validateForm.value;

    this.departmentService.createDepartment(request).subscribe({
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
