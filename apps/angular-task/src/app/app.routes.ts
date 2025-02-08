import { Route } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
        path: 'users',
        component: UserGridComponent,
        // TODO: determine if i want to add lazy loading.
        children: [
            {
                path: ':id',
                component: UserDetailComponent,
            },
        ],
    },
];
