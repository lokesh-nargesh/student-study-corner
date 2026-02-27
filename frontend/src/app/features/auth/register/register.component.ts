import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    template: `
    <div class="container" style="display: flex; justify-content: center; padding: 40px 0;">
      <mat-card style="width: 100%; max-width: 500px; padding: 20px;">
        <mat-card-header>
          <mat-card-title>Student Registration</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" style="margin-top: 20px;">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>College ID</mat-label>
              <input matInput formControlName="collegeId">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
            </mat-form-field>

            <!-- placeholders for dynamic data -->
             <mat-form-field appearance="outline">
              <mat-label>Course</mat-label>
              <mat-select formControlName="courseId">
                <mat-option [value]="1">B.Tech</mat-option>
                <mat-option [value]="2">M.Tech</mat-option>
              </mat-select>
            </mat-form-field>
            
            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
          </form>
          <p style="margin-top: 15px; text-align: center;">
            Already have an account? <a routerLink="/login">Login here</a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    registerForm = this.fb.group({
        name: ['', Validators.required],
        collegeId: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        courseId: [null, Validators.required],
        branchId: [1], // placeholder
        academicYearId: [1], // placeholder
        semesterId: [1] // placeholder
    });

    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe({
                next: () => {
                    this.snackBar.open('Registration Successful! Please login.', 'Close', { duration: 3000 });
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    this.snackBar.open('Registration failed. Try again.', 'Close', { duration: 3000 });
                }
            });
        }
    }
}
