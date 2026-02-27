import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, RouterModule],
    template: `
    <div class="container">
      <h1>Admin Dashboard</h1>
      <mat-card>
        <mat-card-header><mat-card-title>Analytics Summary</mat-card-title></mat-card-header>
        <mat-card-content style="padding: 20px;">
           <button mat-raised-button color="primary" routerLink="/admin/approve">
             Approve Pending Materials
           </button>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class AdminDashboardComponent { }
