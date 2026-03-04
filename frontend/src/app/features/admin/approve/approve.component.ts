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
    templateUrl: './approve.component.html',
    styleUrl: './approve.component.css'
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
