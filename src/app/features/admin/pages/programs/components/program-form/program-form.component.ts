import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ProgramService } from '../../services/program.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DepartmentService } from '../../../departments/services/department.service';
import { DepartmentResponse } from '../../../departments/models/department-response.model';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-program-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './program-form.component.html',
  styleUrl: './program-form.component.css',
})
export class ProgramFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);

  private programService = inject(ProgramService);
  private departmentService = inject(DepartmentService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = signal(false);

  readonly nzModalData = inject(NZ_MODAL_DATA);
  isEditMode = false;
  programId?: number;

  ngOnInit() {
    // this.validateForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   description: [''],
    //   departmentId: ['', [Validators.required]],
    // });

    this.loadDepartments();

     this.isEditMode = !!this.nzModalData?.program;
    if (this.isEditMode) {
      this.programId = this.nzModalData.program.id;
    }

    this.initForm();

    if (this.isEditMode) {
      this.patchFormValues();
    }

  }

  private initForm() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      departmentId: [null, [Validators.required]],
    });
  }

  private patchFormValues() {
    const p = this.nzModalData.program;
    this.validateForm.patchValue({
      name: p.name,
      description: p.description,
      departmentId: p.department.id,
    });
  }

  departmentList = signal<DepartmentResponse[]>([]);

  loadDepartments() {
    this.departmentService.getDepartmentList().subscribe({
      next: (response) => {
        this.departmentList.set(response.data);
      },
      error: () => {
        this.messageService.error('Erreur lors du chargement des départements.');
      },
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
      ? this.programService.updateProgram(this.programId!, formValues)
      : this.programService.createProgram(formValues);

    request$.subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.messageService.success(response.message);
        this.modalRef.close(true);
      },
      error: (err) => {
        this.isLoading.set(false);
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
      }
    });
  }

  close() {
    this.modalRef.close();
  }
}
