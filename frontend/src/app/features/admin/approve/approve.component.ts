import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-approve-materials',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule],
    template: `
    <div class="container">
      <h1>Pending Approval</h1>
      <div *ngFor="let material of pending" class="material-item" style="border: 1px solid #ccc; margin: 10px 0; padding: 15px;">
        <h3>{{material.title}}</h3>
        <p>{{material.description}}</p>
        <button mat-raised-button color="primary" (click)="approve(material.id)">Approve</button>
        <button mat-raised-button color="warn" (click)="reject(material.id)" style="margin-left: 10px;">Reject</button>
      </div>
    </div>
  `
})
export class ApproveMaterialsComponent implements OnInit {
    private http = inject(HttpClient);
    private snackBar = inject(MatSnackBar);
    pending: any[] = [];

    ngOnInit() { this.load(); }

    load() {
        this.http.get<any[]>(`${environment.apiUrl}/admin/pending-materials`).subscribe(res => this.pending = res);
    }

    approve(id: number) {
        this.http.post(`${environment.apiUrl}/admin/approve/${id}`, {}).subscribe(() => {
            this.snackBar.open('Approved', 'Close', { duration: 2000 });
            this.load();
        });
    }

    reject(id: number) {
        this.http.post(`${environment.apiUrl}/admin/reject/${id}`, {}).subscribe(() => {
            this.snackBar.open('Rejected', 'Close', { duration: 2000 });
            this.load();
        });
    }
}
