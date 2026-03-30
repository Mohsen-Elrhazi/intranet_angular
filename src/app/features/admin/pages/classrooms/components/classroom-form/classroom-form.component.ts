import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentResponse } from '../../../students/models/student-response.model';
import { StudentService } from '../../../students/services/student.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProgramService } from '../../../programs/services/program.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TeacherService } from '../../../teachers/services/teacher.service';
import { TeacherResponse } from '../../../teachers/models/teacher-response.model';
import { ProgramResponse } from '../../../programs/models/program-response.model';
import { ClassroomService } from '../../services/classroom.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-classroom-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzAvatarModule
  ],
  templateUrl: './classroom-form.component.html',
  styleUrl: './classroom-form.component.css',
})
export class ClassroomFormComponent implements OnInit {
  private studentService = inject(StudentService);
  private teacherService = inject(TeacherService);
  private classroomService = inject(ClassroomService);

  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);

  private programService = inject(ProgramService);
  private messageService = inject(NzMessageService);

  validateForm!: FormGroup;
  isLoading = signal(false);

  levelOptions = [
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2' },
  ];

  ngOnInit(): void {
    this.loadStudentList();
    this.loadProgramList();
    this.loadTeacherList();

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      promotion: ['', [Validators.required]],
      level: [null, [Validators.required]],
      programId: [null, [Validators.required]],
      studentIds: [[], [Validators.required]],
      teacherIds: [[], [Validators.required]],
    });
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

  studentList = signal<StudentResponse[]>([]);

  loadStudentList(): void {
    this.studentService.getAllStudentList().subscribe({
      next: (response) => {
        this.studentList.set(response.data);
      },
      error: (error) => {
        console.error('Error loading student list:', error);
        this.messageService.error('Erreur lors du chargement de la liste des filieres');
      },
    });
  }

  teacherList = signal<TeacherResponse[]>([]);

  loadTeacherList(): void {
    this.teacherService.getAllTeacherList().subscribe({
      next: (response) => {
        this.teacherList.set(response.data);
      },
      error: (error) => {
        console.error('Error loading teacher list:', error);
        this.messageService.error('Erreur lors du chargement de la liste des enseignants');
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

    this.classroomService.createClassroom(formValues).subscribe({
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
      },
    });
  }

  close() {
    this.modalRef.close();
  }
}
