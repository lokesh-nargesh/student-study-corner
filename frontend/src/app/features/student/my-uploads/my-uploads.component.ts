import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-my-uploads',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule],
    template: `
    <div class="container" style="padding: 30px;">
      <h1>My Uploads</h1>
      <div style="display: flex; flex-wrap: wrap; gap: 20px;">
        <mat-card *ngFor="let m of uploads" style="width: 300px;">
          <mat-card-header>
            <mat-card-title>{{ m.title }}</mat-card-title>
            <mat-card-subtitle>
              <mat-chip-set>
                <mat-chip [class]="m.approvalStatus === 'APPROVED' ? 'approved' : m.approvalStatus === 'REJECTED' ? 'rejected' : 'pending'">
                  {{ m.approvalStatus }}
                </mat-chip>
              </mat-chip-set>
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ m.description }}</p>
            <p><strong>Subject:</strong> {{ m.subjectName }}</p>
          </mat-card-content>
          <mat-card-actions>
            <a [href]="m.fileUrl" target="_blank" mat-button color="primary"><mat-icon>download</mat-icon> View</a>
            <button mat-button color="warn" (click)="delete(m.id)"><mat-icon>delete</mat-icon> Delete</button>
          </mat-card-actions>
        </mat-card>
      </div>
      <p *ngIf="uploads.length === 0">You haven't uploaded any materials yet.</p>
    </div>
  `,
    styles: [`
    .approved { background-color: #4caf50 !important; color: #fff !important; }
    .rejected { background-color: #f44336 !important; color: #fff !important; }
    .pending { background-color: #ff9800 !important; color: #fff !important; }
  `]
})
export class MyUploadsComponent implements OnInit {
    private http = inject(HttpClient);
    private snackBar = inject(MatSnackBar);
    uploads: any[] = [];

    ngOnInit() { this.load(); }

    load() {
        this.http.get<any[]>(`${environment.apiUrl}/materials/my-uploads`).subscribe(res => this.uploads = res);
    }

    delete(id: number) {
        this.http.delete(`${environment.apiUrl}/materials/${id}`).subscribe(() => {
            this.snackBar.open('Deleted', 'Close', { duration: 2000 });
            this.load();
        });
    }
}
