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
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
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
