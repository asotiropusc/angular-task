import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs/operators';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        ToastModule,
        BreadcrumbModule
    ],
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'angular-task';

    router = inject(Router);
    route = inject(ActivatedRoute);

    home = { icon: 'pi pi-users', label: 'Users', routerLink: ['/users'] };

    breadcrumbItems = signal<{ label: string; route?: string }[]>([]);

    constructor () {

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {

            this.updateBreadcrumb();

        });

    }

    updateBreadcrumb () {

        const currentUrl = this.router.url;

        if (currentUrl === '/users') {

            this.breadcrumbItems.set([]);

        } else if (currentUrl.startsWith('/users/')) {

            this.breadcrumbItems.set([
                { label: 'User Details' }
            ]);

        }

    }

}
