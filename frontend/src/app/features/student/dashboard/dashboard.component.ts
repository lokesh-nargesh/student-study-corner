import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h1 class="welcome">Welcome, {{ userName }}!</h1>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-icon class="stat-icon">library_books</mat-icon>
          <div class="stat-info">
            <span class="stat-number">{{ materials.length }}</span>
            <span class="stat-label">Available Materials</span>
          </div>
        </mat-card>

        <mat-card class="stat-card">
          <mat-icon class="stat-icon">cloud_upload</mat-icon>
          <div class="stat-info">
            <span class="stat-number">{{ myCount }}</span>
            <span class="stat-label">My Uploads</span>
          </div>
        </mat-card>
      </div>

      <div class="quick-actions">
        <button mat-raised-button color="primary" routerLink="/student/upload">
          <mat-icon>add</mat-icon> Upload Material
        </button>
        <button mat-raised-button color="accent" routerLink="/student/browse">
          <mat-icon>search</mat-icon> Browse Materials
        </button>
      </div>

      <h2 style="color: #fff; margin: 30px 0 15px;">Recent Materials</h2>
      <div class="materials-grid">
        <mat-card *ngFor="let m of materials.slice(0, 4)" class="material-card">
          <div class="card-thumb">
            <span>{{ formatType(m.materialType) }}</span>
          </div>
          <mat-card-content class="card-body">
            <h3>{{ m.title }}</h3>
            <p><strong>Branch:</strong> {{ m.branchName }}</p>
            <p><strong>Semester:</strong> {{ m.semesterNumber }}</p>
          </mat-card-content>
          <mat-card-actions>
            <a [href]="m.fileUrl" target="_blank" mat-raised-button color="primary" class="view-btn">
              <mat-icon>visibility</mat-icon> View Paper
            </a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 24px;
    }
    .welcome { color: #fff; font-size: 1.8rem; margin-bottom: 24px; }
    .stats-grid { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 24px; }
    .stat-card {
      display: flex; align-items: center; gap: 16px; padding: 20px 28px;
      border-radius: 12px; flex: 1; min-width: 220px;
    }
    .stat-icon { font-size: 40px; width: 40px; height: 40px; color: #3f51b5; }
    .stat-number { font-size: 2rem; font-weight: 700; display: block; }
    .stat-label { font-size: 0.9rem; color: #666; }
    .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .materials-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;
    }
    .material-card { border-radius: 12px; overflow: hidden; }
    .card-thumb {
      height: 120px; background: linear-gradient(135deg, #1a1a2e, #16213e);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 1.3rem; font-weight: 700;
    }
    .card-body { padding: 12px; }
    .card-body h3 { margin: 0 0 8px; }
    .card-body p { margin: 2px 0; font-size: 0.9rem; }
    .view-btn { margin: 8px; }
  `]
})
export class StudentDashboardComponent implements OnInit {
  private http = inject(HttpClient);
  materials: any[] = [];
  myCount = 0;
  userName = 'Student';

  ngOnInit() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.name || 'Student';
    } catch { }
    this.http.get<any[]>(`${environment.apiUrl}/materials/approved`).subscribe(res => this.materials = res);
    this.http.get<any[]>(`${environment.apiUrl}/materials/my-uploads`).subscribe(res => this.myCount = res.length);
  }

  formatType(type: string): string {
    const map: any = {
      'NOTES': 'Notes', 'ASSIGNMENT': 'Assignment', 'MID_SEM': 'Mid Sem',
      'SEM_EXAM': 'End Sem', 'OLD_PAPER': 'Question Papers'
    };
    return map[type] || type;
  }
}
