import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private modalRef = inject(NzModalRef);
  private messageService = inject(NzMessageService);
  readonly nzModalData = inject(NZ_MODAL_DATA);

  classroomId = this.nzModalData.classroomId;

  isLoading = signal(false);
  selectedFile: File | null = null;
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      file: [null, [Validators.required]] 
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.validateForm.patchValue({ file: file });
      this.validateForm.get('file')?.updateValueAndValidity();
    }
  }

  envoyer(): void {
    if (this.validateForm.invalid || !this.selectedFile) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isLoading.set(true);

    const formData = new FormData();
    formData.append('title', this.validateForm.get('title')?.value);
    formData.append('description', this.validateForm.get('description')?.value || '');
    formData.append('file', this.selectedFile);
    formData.append('classroomId', this.classroomId.toString());

    this.courseService.createCourse(formData).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.messageService.success(res.message || 'Cours ajouté avec succès');
        this.modalRef.close(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.messageService.error(err.error?.message || 'Erreur lors de l\'ajout du cours');
      }
    });
  }

  close(): void {
    this.modalRef.close();
  }
}
