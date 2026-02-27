import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="app-toolbar">
      <span class="brand">📚 Study Material</span>

      <ng-container *ngIf="isLoggedIn()">
        <button mat-button routerLink="/student/dashboard" routerLinkActive="active-link">
          <mat-icon>home</mat-icon> Home
        </button>
        <button mat-button routerLink="/student/browse" routerLinkActive="active-link">
          <mat-icon>library_books</mat-icon> Study Materials
        </button>
        <button mat-button [matMenuTriggerFor]="uploadsMenu" routerLinkActive="active-link">
          <mat-icon>cloud_upload</mat-icon> Uploads <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #uploadsMenu="matMenu">
          <button mat-menu-item routerLink="/student/upload">
            <mat-icon>note_add</mat-icon> Upload Material
          </button>
          <button mat-menu-item routerLink="/student/my-uploads">
            <mat-icon>folder</mat-icon> My Uploads
          </button>
        </mat-menu>

        <button mat-button [matMenuTriggerFor]="moreMenu">
          <mat-icon>more_horiz</mat-icon> More <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #moreMenu="matMenu">
          <button mat-menu-item *ngIf="isAdmin()" routerLink="/admin/dashboard">
            <mat-icon>admin_panel_settings</mat-icon> Admin Panel
          </button>
          <button mat-menu-item routerLink="/student/profile">
            <mat-icon>person</mat-icon> Profile
          </button>
        </mat-menu>
      </ng-container>

      <span class="spacer"></span>

      <ng-container *ngIf="isLoggedIn()">
        <button mat-button [matMenuTriggerFor]="profileMenu" class="profile-btn">
          <mat-icon>account_circle</mat-icon>
          <span class="user-name">{{ getUserName() }}</span>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item routerLink="/student/profile">
            <mat-icon>person</mat-icon> My Profile
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon> Logout
          </button>
        </mat-menu>
      </ng-container>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .app-toolbar {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: #fff;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .brand {
      font-size: 1.3rem;
      font-weight: 700;
      margin-right: 24px;
      letter-spacing: 1px;
    }
    .spacer { flex: 1 1 auto; }
    .active-link { background: rgba(255,255,255,0.1); border-radius: 4px; }
    .profile-btn { text-transform: capitalize; }
    .user-name { margin: 0 4px; font-weight: 500; }
    button[mat-button] { color: #fff !important; }
  `]
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn() { return !!localStorage.getItem('token'); }
  isAdmin() { return localStorage.getItem('role') === 'ADMIN'; }

  getUserName(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.name || 'User';
    } catch { return 'User'; }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
