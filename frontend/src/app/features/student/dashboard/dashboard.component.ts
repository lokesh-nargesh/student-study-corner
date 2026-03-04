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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
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
