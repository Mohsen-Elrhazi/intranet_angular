import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DepartmentService } from '../../../departments/services/department.service';
import { DepartmentResponse } from '../../../departments/models/department-response.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SubjectService } from '../../services/subject.service';
import { ProgramFormComponent } from '../../../programs/components/program-form/program-form.component';
import { ProgramService } from '../../../programs/services/program.service';
import { ProgramResponse } from '../../../programs/models/program-response.model';
import { CreateSubjectRequest } from '../../models/create-subject-request.model';

@Component({
  selector: 'app-subject-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,

  ],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.css',
})
export class SubjectFormComponent {

    private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);

  private subjectService = inject(SubjectService);
  private programService = inject(ProgramService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = signal(false);


  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      programId: ['', [Validators.required]],
    });

    this.loadProgramList();
  }

  programList = signal<ProgramResponse[]>([]);

  loadProgramList(): void {
    this.programService.getAllProgramList().subscribe({
      next: (response) => {
        this.programList.set(response.data);
      },
      error: (error) => {
        console.error('Error loading program list:', error);
        this.messageService.error('Erreur lors du chargement de la liste des filieres');
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

    const formValues: CreateSubjectRequest = this.validateForm.value;



    this.subjectService.createSubject(formValues).subscribe({
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
