import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
