import { Route } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    { path: 'users', children: [
        { path: '', component: UserGridComponent },
        { path: ':id', component: UserDetailComponent, data: { breadcrumb: 'User Details' } }
    ] }
];
