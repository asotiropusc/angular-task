import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, Event } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {

    let component: AppComponent;
    let router: Router;
    let routerEventsSubject: BehaviorSubject<Event | null>;

    beforeEach(async () => {

        routerEventsSubject = new BehaviorSubject<Event | null>(null);

        const routerMock = {
            events: routerEventsSubject.asObservable(),
            url: '/users',
            createUrlTree: () => ({}),
            navigate: jest.fn(),
            navigateByUrl: jest.fn(),
            serializeUrl: jest.fn(),
            parseUrl: jest.fn(),
            isActive: jest.fn()
        };

        const activatedRouteMock = {
            snapshot: {},
            params: new BehaviorSubject({}),
            queryParams: new BehaviorSubject({}),
            url: new BehaviorSubject([])
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent, BreadcrumbModule, ToastModule],
            providers: [
                MessageService,
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ]
        }).compileComponents();

        router = TestBed.inject(Router);

    });

    beforeEach(() => {

        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should have correct home configuration', () => {

        expect(component.home).toEqual({
            icon: 'pi pi-users',
            label: 'Users',
            routerLink: ['/users']
        });

    });

    it('should clear breadcrumb items when navigating to /users', fakeAsync(() => {

        Object.defineProperty(router, 'url', { get: () => '/users' });
        routerEventsSubject.next(new NavigationEnd(1, '/users', '/users'));
        tick();
        expect(component.breadcrumbItems()).toEqual([]);

    }));

    it('should set User Details breadcrumb when navigating to user details', fakeAsync(() => {

        Object.defineProperty(router, 'url', { get: () => '/users/123' });
        routerEventsSubject.next(new NavigationEnd(1, '/users/123', '/users/123'));
        tick();
        expect(component.breadcrumbItems()).toEqual([
            { label: 'User Details' }
        ]);

    }));

    it('should initialize with correct default title', () => {

        expect(component.title).toBe('angular-task');

    });

    it('should not update breadcrumbs for non-NavigationEnd events', fakeAsync(() => {

        component.breadcrumbItems.set([{ label: 'Initial State' }]);
        routerEventsSubject.next(new NavigationStart(1, '/users'));
        tick();
        expect(component.breadcrumbItems()).toEqual([{ label: 'Initial State' }]);

    }));

});
