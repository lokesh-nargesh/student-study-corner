import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule],
    template: `
    <div class="container" style="padding: 30px; max-width: 600px; margin: auto;">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar style="font-size: 48px; width: 48px; height: 48px;">account_circle</mat-icon>
          <mat-card-title>{{ user.name }}</mat-card-title>
          <mat-card-subtitle>{{ user.collegeId }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content style="padding: 20px;">
          <p><strong>Role:</strong> {{ user.role }}</p>
          <p *ngIf="user.email"><strong>Email:</strong> {{ user.email }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProfileComponent {
    user: any = {};

    constructor() {
        try {
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
        } catch { }
    }
}
