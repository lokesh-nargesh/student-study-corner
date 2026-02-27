import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
    const router = inject(Router);
    const userRole = localStorage.getItem('role');
    if (userRole === 'ADMIN') return true;
    router.navigate(['/student/dashboard']);
    return false;
};
