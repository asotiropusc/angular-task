import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridComponent } from './user-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@angular-task/user';
import { Filter } from '../store/app.store';
import { UsersStore } from '../store/app.store';
import { MessageService } from 'primeng/api';

interface UsersStoreStub {
    loadAll: () => void;
    users: () => User[];
    favorites: () => Record<number, boolean>;
    isFavorite: (id: number) => boolean;
}

describe('UserGridComponent', () => {

    let component: UserGridComponent;
    let fixture: ComponentFixture<UserGridComponent>;
    let usersStoreStub: Partial<UsersStoreStub>;
    let loadAllSpy: jest.Mock;
    let usersStub: User[];
    let favoritesStub: Record<number, boolean>;

    beforeEach(async () => {

        usersStub = [
            {
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
            },
            {
                id: 2,
                name: 'Ervin Howell',
                username: 'Antonette',
                email: 'Shanna@melissa.tv',
                address: {
                    street: 'Victor Plains',
                    suite: 'Suite 879',
                    city: 'Wisokyburgh',
                    zipcode: '90566-7771',
                    geo: { lat: '-43.9509', lng: '-34.4618' }
                },
                phone: '010-692-6593 x09125',
                website: 'anastasia.net',
                company: {
                    name: 'Deckow-Crist',
                    catchPhrase: 'Proactive didactic contingency',
                    bs: 'synergize scalable supply-chains'
                }
            },
            {
                id: 3,
                name: 'Clementine Bauch',
                username: 'Samantha',
                email: 'Nathan@yesenia.net',
                address: {
                    street: 'Douglas Extension',
                    suite: 'Suite 847',
                    city: 'McKenziehaven',
                    zipcode: '59590-4157',
                    geo: { lat: '-68.6102', lng: '-47.0653' }
                },
                phone: '1-463-123-4447',
                website: 'ramiro.info',
                company: {
                    name: 'Romaguera-Jacobson',
                    catchPhrase: 'Face to face bifurcated interface',
                    bs: 'e-enable strategic applications'
                }
            }
        ];

        favoritesStub = {
            1: true,
            2: false,
            3: true,
        };

        loadAllSpy = jest.fn();

        usersStoreStub = {
            loadAll: loadAllSpy,
            users: () => usersStub,
            favorites: () => favoritesStub,
            isFavorite: (id: number) => favoritesStub[id],
        };

        await TestBed.configureTestingModule({
            imports: [UserGridComponent, ReactiveFormsModule],
            providers: [
                { provide: UsersStore, useValue: usersStoreStub },
                { provide: MessageService, useValue: { add: jest.fn() } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the component and call loadAll()', () => {

        expect(component).toBeTruthy();
        expect(loadAllSpy).toHaveBeenCalled();

    });

    it('should compute filteredUsers correctly when filter is "all"', () => {

        const rows = component.filteredUsers();
        expect(rows.length).toBe(2);
        expect(rows[0].length).toBe(2);
        expect(rows[1].length).toBe(1);

        expect(component.emptyStateMessage).toBe('No users found.');

    });

    it('should compute filteredUsers correctly when filter is "favorite"', () => {

        component.filterSignal.set('favorite' as Filter);
        fixture.detectChanges();

        const rows = component.filteredUsers();
        expect(rows.length).toBe(1);
        expect(rows[0].length).toBe(2);
        expect(rows[0].map((u) => u.id)).toEqual([1, 3]);

        expect(component.emptyStateMessage).toBe('You haven\'t favorited any users yet.');

    });

    it('should compute filteredUsers correctly when filter is "non-favorite"', () => {

        component.filterSignal.set('non-favorite' as Filter);
        fixture.detectChanges();

        const rows = component.filteredUsers();
        expect(rows.length).toBe(1);
        expect(rows[0].length).toBe(1);
        expect(rows[0][0].id).toBe(2);

        expect(component.emptyStateMessage).toBe('All users are in your favorites.');

    });

    it('should update filterSignal when the form control value changes', () => {

        expect(component.filterSignal()).toBe('all');
        component.formGroup.get('filter')?.setValue('favorite');
        fixture.detectChanges();
        expect(component.filterSignal()).toBe('favorite');

    });

});
