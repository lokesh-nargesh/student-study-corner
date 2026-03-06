import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.StudentDashboardComponent) },
    { path: 'upload', loadComponent: () => import('./upload/upload.component').then(m => m.UploadMaterialComponent) },
    { path: 'browse', loadComponent: () => import('./browse/browse.component').then(m => m.BrowseMaterialsComponent) },
    { path: 'my-uploads', loadComponent: () => import('./my-uploads/my-uploads.component').then(m => m.MyUploadsComponent) },
    { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
