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
  branches: any[] = [];
  semesters: any[] = [];

  uploadForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    materialType: ['', Validators.required],
    branchId: [null],
    semesterId: [null],
    year: [''],
    subjectId: [1]
  });

  ngOnInit() {
    // Load dropdown data from backend
    this.http.get<any[]>(`${environment.apiUrl}/data/branches`).subscribe({
      next: res => this.branches = res,
      error: () => {
        this.branches = [
          { id: 1, name: 'CS' }, { id: 2, name: 'IT' }, { id: 3, name: 'AI/ML' },
          { id: 4, name: 'IoT' }, { id: 5, name: 'EC' }, { id: 6, name: 'ME' },
          { id: 7, name: 'Cyber Security' }, { id: 8, name: 'Data Science' }
        ];
      }
    });
    this.http.get<any[]>(`${environment.apiUrl}/data/semesters`).subscribe({
      next: res => this.semesters = res,
      error: () => {
        this.semesters = [
          { id: 1, semesterNumber: 1 }, { id: 2, semesterNumber: 2 },
          { id: 3, semesterNumber: 3 }, { id: 4, semesterNumber: 4 },
          { id: 5, semesterNumber: 5 }, { id: 6, semesterNumber: 6 },
          { id: 7, semesterNumber: 7 }, { id: 8, semesterNumber: 8 }
        ];
      }
    });
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
        const materialData = {
          ...this.uploadForm.value,
          fileUrl: url,
          // Map simple IDs to objects if backend expects them (though backend was semi-handling this)
          subject: { id: this.uploadForm.value.subjectId || 1 },
          branch: this.uploadForm.value.branchId ? { id: this.uploadForm.value.branchId } : null,
          semester: this.uploadForm.value.semesterId ? { id: this.uploadForm.value.semesterId } : null
        };

        this.http.post(`${environment.apiUrl}/materials/upload`, materialData).subscribe({
          next: () => {
            this.snackBar.open('Material uploaded! Pending admin approval.', 'Close', { duration: 3000 });
            this.uploadForm.reset({ subjectId: 1 });
            this.selectedFile = null;
            this.uploading = false;
          },
          error: () => {
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
