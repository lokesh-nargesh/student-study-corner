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
  template: `
    <div class="upload-container">
      <div class="upload-header">
        <h1>Add Study Material</h1>
      </div>

      <mat-card class="upload-card">
        <mat-card-content>
          <form [formGroup]="uploadForm" (ngSubmit)="onSubmit()" class="upload-form">

            <div class="form-row">
              <label class="form-label">Semester</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Select Semester</mat-label>
                <mat-select formControlName="semesterId">
                  <mat-option *ngFor="let sem of semesters" [value]="sem.id">
                    Semester {{ sem.semesterNumber }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <label class="form-label">Branch</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Select Branch</mat-label>
                <mat-select formControlName="branchId">
                  <mat-option *ngFor="let branch of branches" [value]="branch.id">
                    {{ branch.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <label class="form-label">Subject</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Enter Subject</mat-label>
                <input matInput formControlName="title" placeholder="e.g. Compiler Design">
              </mat-form-field>
            </div>

            <div class="form-row">
              <label class="form-label">Type</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Select Type</mat-label>
                <mat-select formControlName="materialType">
                  <mat-option value="NOTES">Notes</mat-option>
                  <mat-option value="ASSIGNMENT">Assignment</mat-option>
                  <mat-option value="MID_SEM">Mid Sem Papers</mat-option>
                  <mat-option value="SEM_EXAM">End Sem Papers</mat-option>
                  <mat-option value="OLD_PAPER">Old Question Papers</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <label class="form-label">Year</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Enter Year Ex:- 2022</mat-label>
                <input matInput formControlName="year" placeholder="2024">
              </mat-form-field>
            </div>

            <div class="form-row">
              <label class="form-label">Description</label>
              <mat-form-field appearance="outline" class="form-input">
                <mat-label>Brief description (optional)</mat-label>
                <textarea matInput formControlName="description" rows="2"></textarea>
              </mat-form-field>
            </div>

            <div class="form-row file-row">
              <input type="file" (change)="onFileSelected($event)" accept=".pdf,.doc,.docx,.ppt,.pptx" #fileInput>
              <span *ngIf="selectedFile" class="file-name">{{ selectedFile.name }}</span>
            </div>

            <mat-progress-bar *ngIf="uploading" mode="indeterminate" class="progress"></mat-progress-bar>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit"
                      [disabled]="uploadForm.invalid || !selectedFile || uploading">
                <mat-icon>save</mat-icon> Save
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .upload-container {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }
    .upload-header h1 {
      text-align: center;
      color: #fff;
      font-size: 2rem;
      font-style: italic;
      text-decoration: underline;
      margin-bottom: 30px;
    }
    .upload-card {
      max-width: 700px;
      margin: 0 auto;
      padding: 30px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 16px;
    }
    .upload-form { display: flex; flex-direction: column; gap: 8px; }
    .form-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .form-label {
      width: 120px;
      font-weight: 600;
      font-size: 1.1rem;
      color: #fff;
      font-style: italic;
      text-align: right;
    }
    .form-input { flex: 1; }
    .file-row { margin-top: 10px; padding-left: 136px; }
    .file-name { color: #fff; margin-left: 10px; }
    .progress { margin-top: 10px; }
    .form-actions { text-align: center; margin-top: 16px; }
    ::ng-deep .upload-card .mat-mdc-form-field-outline { color: rgba(255,255,255,0.5) !important; }
    ::ng-deep .upload-card .mat-mdc-text-field-wrapper { background: rgba(255,255,255,0.85); border-radius: 6px; }
  `]
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
          subject: { id: this.uploadForm.value.subjectId || 1 }
        };
        this.http.post(`${environment.apiUrl}/materials/upload`, materialData).subscribe({
          next: () => {
            this.snackBar.open('Material uploaded! Pending admin approval.', 'Close', { duration: 3000 });
            this.uploadForm.reset();
            this.selectedFile = null;
          },
          error: () => this.snackBar.open('Upload failed.', 'Close', { duration: 3000 })
        });
      } catch (e) {
        this.snackBar.open('File upload to storage failed.', 'Close', { duration: 3000 });
      }
      this.uploading = false;
    }
  }
}
