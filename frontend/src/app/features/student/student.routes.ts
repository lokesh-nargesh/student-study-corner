import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './dashboard/dashboard.component';
import { UploadMaterialComponent } from './upload/upload.component';
import { BrowseMaterialsComponent } from './browse/browse.component';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';
import { ProfileComponent } from './profile/profile.component';

export const STUDENT_ROUTES: Routes = [
    { path: 'dashboard', component: StudentDashboardComponent },
    { path: 'upload', component: UploadMaterialComponent },
    { path: 'browse', component: BrowseMaterialsComponent },
    { path: 'my-uploads', component: MyUploadsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
