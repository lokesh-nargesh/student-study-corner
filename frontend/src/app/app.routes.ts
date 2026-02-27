import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
    {
        path: 'student',
        canActivate: [authGuard],
        loadChildren: () => import('./features/student/student.routes').then(m => m.STUDENT_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
