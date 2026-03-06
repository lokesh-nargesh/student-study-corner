import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.AdminDashboardComponent) },
    { path: 'approve', loadComponent: () => import('./approve/approve.component').then(m => m.ApproveMaterialsComponent) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
