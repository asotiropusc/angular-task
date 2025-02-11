import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersStore } from '../store/app.store';
import { UserService } from '@angular-task/user';
import { ToastMessageService } from '@angular-task/toast-message';

const stubUser = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
    }
};

const activatedRouteStub = {
    paramMap: of({
        get: (_key: string) => '1'
    })
};

const usersStoreStub = {
    getUser: (id: number) => (id === 1 ? stubUser : undefined),
    toggleFavorite: jest.fn(),
    isFavorite: (_id: number) => false,
};

const userServiceStub = {
    getUser: (_id: number) => of({ data: stubUser }),
};

const toastServiceStub = {
    showFavoriteToast: jest.fn(),
};

describe('UserDetailComponent', () => {

    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [UserDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: UsersStore, useValue: usersStoreStub },
                { provide: UserService, useValue: userServiceStub },
                { provide: ToastMessageService, useValue: toastServiceStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component and set user correctly', () => {

        expect(component).toBeTruthy();
        expect(component.user()).toEqual(stubUser);

    });

    it('should toggle favorite and call showFavoriteToast', () => {

        component.toggleFavorite(1);
        expect(usersStoreStub.toggleFavorite).toHaveBeenCalledWith(1);
        expect(toastServiceStub.showFavoriteToast).toHaveBeenCalledWith(stubUser.name, false);

    });

});
