import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridCardComponent } from './user-grid-card.component';
import { UsersStore } from '../../store/app.store';
import { Router } from '@angular/router';
import { ToastMessageService } from '@angular-task/toast-message';
import { User } from '@angular-task/user';

describe('UserGridCardComponent', () => {

    let component: UserGridCardComponent;
    let fixture: ComponentFixture<UserGridCardComponent>;

    const routerMock = {
        navigate: jest.fn(),
    };

    const storeMock = {
        toggleFavorite: jest.fn(),
        isFavorite: jest.fn().mockReturnValue(false),
    };

    const toastServiceMock = {
        showFavoriteToast: jest.fn(),
    };

    const testUser: User = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496'
            }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets'
        }
    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [UserGridCardComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: UsersStore, useValue: storeMock },
                { provide: ToastMessageService, useValue: toastServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserGridCardComponent);
        component = fixture.componentInstance;
        component.user = testUser;
        fixture.detectChanges();

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should navigate to user details when navigateToUserDetail is called', () => {

        component.navigateToUserDetail(testUser.id);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/users', testUser.id]);

    });

    it('should toggle favorite and show toast when toggleFavorite is called', () => {

        component.toggleFavorite(testUser.id);

        expect(storeMock.toggleFavorite).toHaveBeenCalledWith(testUser.id);

        expect(storeMock.isFavorite).toHaveBeenCalledWith(testUser.id);

        expect(toastServiceMock.showFavoriteToast).toHaveBeenCalledWith(testUser.name, false);

    });

});
