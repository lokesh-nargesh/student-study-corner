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
  templateUrl: './my-uploads.component.html',
  styleUrl: './my-uploads.component.css'
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
