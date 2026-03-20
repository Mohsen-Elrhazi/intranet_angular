import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DepartmentService } from '../../services/department.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartmentRequest } from '../../models/create-department-request.model';

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
  isLoading = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
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

    this.isLoading = true;

    const request: CreateDepartmentRequest = this.validateForm.value;

    this.departmentService.createDepartment(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.messageService.success(response.message);
        this.modalRef.close();
      },
      error: (err) => {
        this.isLoading = false;

        if ((err.status === 400 || err.status === 409) && err.error?.errors?.name) {
          const errorMessage = err.error.errors.name;
          this.messageService.error(errorMessage);

          this.validateForm.get('name')?.setErrors({ backendError: errorMessage });
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
