import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class AppComponent implements OnDestroy {

    private destroy$ = new Subject<void>();

    title = 'angular-task';

    router = inject(Router);
    route = inject(ActivatedRoute);

    home = { icon: 'pi pi-users', label: 'Users', routerLink: ['/users'] };

    breadcrumbItems = signal<{ label: string; route?: string }[]>([]);

    constructor () {

        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            takeUntil(this.destroy$)
        ).subscribe(() => {

            this.updateBreadcrumb();

        });

    }

    updateBreadcrumb () {

        const breadcrumbs: { label: string; }[] = [];
        let currentRoute = this.route.root;

        while (currentRoute.firstChild) {

            currentRoute = currentRoute.firstChild;
            const breadcrumb = currentRoute.snapshot.data['breadcrumb'];

            if (breadcrumb) {

                breadcrumbs.push({ label: breadcrumb });

            }

        }

        this.breadcrumbItems.set(breadcrumbs);

    }

    ngOnDestroy (): void {

        this.destroy$.next();
        this.destroy$.complete();

    }

}
