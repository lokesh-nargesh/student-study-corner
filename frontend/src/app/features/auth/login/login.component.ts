import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    template: `
    <div class="container" style="display: flex; height: 100vh; align-items: center; justify-content: center;">
      <mat-card style="width: 100%; max-width: 400px; padding: 20px;">
        <mat-card-header>
          <mat-card-title>Login to Study Material Platform</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" style="margin-top: 20px;">
            <mat-form-field appearance="outline">
              <mat-label>College ID</mat-label>
              <input matInput formControlName="collegeId" placeholder="e.g. CS2024001">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
            </mat-form-field>
            
            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
          </form>
          <p style="margin-top: 15px; text-align: center;">
            Don't have an account? <a routerLink="/register">Register here</a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    loginForm = this.fb.group({
        collegeId: ['', Validators.required],
        password: ['', Validators.required]
    });

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (res) => {
                    this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
                    if (res.role === 'ADMIN') {
                        this.router.navigate(['/admin/dashboard']);
                    } else {
                        this.router.navigate(['/student/dashboard']);
                    }
                },
                error: (err) => {
                    this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
                }
            });
        }
    }
}
