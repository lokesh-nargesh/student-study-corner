import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-browse-materials',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
    template: `
    <div class="browse-container">
      <div class="browse-header">
        <h1>All Study Materials</h1>
      </div>

      <div class="materials-grid">
        <mat-card *ngFor="let m of materials" class="material-card">
          <div class="card-thumbnail">
            <div class="thumbnail-overlay">
              <span class="type-badge">{{ formatType(m.materialType) }}</span>
            </div>
          </div>
          <mat-card-content class="card-body">
            <h3 class="card-title">{{ m.title || m.subjectName }}</h3>
            <div class="card-info">
              <p><strong>Branch:</strong> {{ m.branchName || 'N/A' }}</p>
              <p><strong>Semester:</strong> {{ m.semesterNumber || 'N/A' }}</p>
              <p><strong>Type:</strong> {{ formatType(m.materialType) }}</p>
              <p><strong>By:</strong> {{ m.uploadedByName }}</p>
            </div>
            <div class="card-actions">
              <a [href]="m.fileUrl" target="_blank" mat-raised-button color="primary" (click)="incrementDownload(m.id)">
                <mat-icon>download</mat-icon> View Paper
              </a>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <p *ngIf="materials.length === 0" class="no-data">No approved materials yet.</p>
    </div>
  `,
    styles: [`
    .browse-container {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
    }
    .browse-header h1 {
      text-align: center;
      color: #fff;
      font-size: 2rem;
      font-style: italic;
      text-decoration: underline;
      margin-bottom: 30px;
    }
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .material-card {
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s;
    }
    .material-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .card-thumbnail {
      height: 160px;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .thumbnail-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .type-badge {
      color: #fff;
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
      line-height: 1.3;
    }
    .card-body { padding: 16px; }
    .card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; }
    .card-info p { margin: 4px 0; font-size: 0.9rem; }
    .card-actions { margin-top: 12px; }
    .no-data { text-align: center; color: #fff; font-size: 1.2rem; margin-top: 60px; }
  `]
})
export class BrowseMaterialsComponent implements OnInit {
    private http = inject(HttpClient);
    materials: any[] = [];

    ngOnInit() {
        this.http.get<any[]>(`${environment.apiUrl}/materials/approved`).subscribe(res => this.materials = res);
    }

    incrementDownload(id: number) {
        this.http.post(`${environment.apiUrl}/materials/download/${id}`, {}).subscribe();
    }

    formatType(type: string): string {
        const map: any = {
            'NOTES': 'Notes', 'ASSIGNMENT': 'Assignment', 'MID_SEM': 'Mid Sem',
            'SEM_EXAM': 'End Sem', 'OLD_PAPER': 'Question Papers'
        };
        return map[type] || type;
    }
}
