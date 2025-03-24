import { inject, Injectable, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService implements OnDestroy {

    private destroy$ = new Subject<void>();

    router = inject(Router);
    route = inject(ActivatedRoute);

    private readonly homeItem = { icon: 'pi pi-users', label: 'Users', routerLink: ['/users'] };

    breadcrumbItems = signal<{ label: string; route?: string }[]>([]);

    get home () {

        return this.homeItem;

    }

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
