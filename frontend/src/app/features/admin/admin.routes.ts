import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { ApproveMaterialsComponent } from './approve/approve.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'approve', component: ApproveMaterialsComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
