import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient } from '@angular/common/http';
import { FirebaseStorageService } from '../../../core/services/firebase-storage.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-upload-material',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule,
    MatIconModule, MatProgressBarModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadMaterialComponent implements OnInit {
  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseStorageService);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  selectedFile: File | null = null;
  uploading = false;
  courses: any[] = [];
  branches: any[] = [];
  academicYears: any[] = [];
  semesters: any[] = [];
  subjects: any[] = [];

  uploadForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    materialType: ['', Validators.required],
    courseId: [null, Validators.required],
    branchId: [null, Validators.required],
    academicYearId: [null, Validators.required],
    semesterId: [null, Validators.required],
    subjectId: [null, Validators.required]
  });

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.http.get<any[]>(`${environment.apiUrl}/data/courses`).subscribe(res => this.courses = res);
  }

  onCourseChange() {
    const courseId = this.uploadForm.get('courseId')?.value;
    this.branches = [];
    this.academicYears = [];
    this.semesters = [];
    this.subjects = [];
    this.uploadForm.patchValue({ branchId: null, academicYearId: null, semesterId: null, subjectId: null });

    if (courseId) {
      this.http.get<any[]>(`${environment.apiUrl}/data/branches?courseId=${courseId}`).subscribe(res => {
        this.branches = res;
      });
    }
  }

  onBranchChange() {
    const branchId = this.uploadForm.get('branchId')?.value;
    this.academicYears = [];
    this.semesters = [];
    this.subjects = [];
    this.uploadForm.patchValue({ academicYearId: null, semesterId: null, subjectId: null });

    if (branchId) {
      this.http.get<any[]>(`${environment.apiUrl}/data/academic-years?branchId=${branchId}`).subscribe(res => {
        this.academicYears = res;
      });
    }
  }

  onYearChange() {
    const yearId = this.uploadForm.get('academicYearId')?.value;
    this.semesters = [];
    this.subjects = [];
    this.uploadForm.patchValue({ semesterId: null, subjectId: null });

    if (yearId) {
      this.http.get<any[]>(`${environment.apiUrl}/data/semesters?yearId=${yearId}`).subscribe(res => {
        this.semesters = res;
      });
    }
  }

  onSemesterChange() {
    const semesterId = this.uploadForm.get('semesterId')?.value;
    this.subjects = [];
    this.uploadForm.patchValue({ subjectId: null });

    if (semesterId) {
      this.http.get<any[]>(`${environment.apiUrl}/data/subjects?semesterId=${semesterId}`).subscribe(res => {
        this.subjects = res;
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.selectedFile && this.uploadForm.valid) {
      this.uploading = true;
      try {
        const url = await this.firebaseService.uploadFile(
          this.selectedFile,
          `materials/${Date.now()}_${this.selectedFile.name}`
        );
        const formValue = this.uploadForm.value;
        const materialData = {
          title: formValue.title,
          description: formValue.description,
          materialType: formValue.materialType,
          fileUrl: url,
          course: { id: formValue.courseId },
          branch: { id: formValue.branchId },
          academicYear: { id: formValue.academicYearId },
          semester: { id: formValue.semesterId },
          subject: { id: formValue.subjectId }
        };

        this.http.post(`${environment.apiUrl}/materials/upload`, materialData).subscribe({
          next: () => {
            this.snackBar.open('Material uploaded! Pending admin approval.', 'Close', { duration: 3000 });
            this.uploadForm.reset();
            this.selectedFile = null;
            this.uploading = false;
          },
          error: (err) => {
            console.error('Upload error', err);
            this.snackBar.open('Backend upload failed.', 'Close', { duration: 3000 });
            this.uploading = false;
          }
        });
      } catch (e) {
        this.snackBar.open('File storage upload failed.', 'Close', { duration: 3000 });
        this.uploading = false;
      }
    }
  }
}
