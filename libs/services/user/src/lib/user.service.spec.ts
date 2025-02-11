import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './models/user.model';

describe('UserService', () => {

    let service: UserService;
    let httpMock: HttpTestingController;
    let originalConsoleError: any;

    const mockUsers: User[] = [
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
        }
    ];

    beforeAll(() => {

        originalConsoleError = console.error;
        console.error = jest.fn();

    });

    afterAll(() => {

        console.error = originalConsoleError;

    });

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {

        httpMock.verify();
        jest.clearAllMocks();

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('getUsers', () => {

        it('should return ApiResponse with users array on successful HTTP request', fakeAsync(() => {

            let response: any;

            service.getUsers().subscribe((result) => {

                response = result;

            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
            expect(req.request.method).toBe('GET');
            req.flush(mockUsers);

            tick();

            expect(response).toEqual({
                success: true,
                data: mockUsers
            });

        }));

        it('should return ApiResponse with success false on HTTP error', fakeAsync(() => {

            let response: any;

            service.getUsers().subscribe((result) => {

                response = result;

            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('Network error'));

            tick();

            expect(response).toEqual({
                success: false,
                data: null
            });

        }));

        it('should log error to console on HTTP error', fakeAsync(() => {

            service.getUsers().subscribe();

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
            const errorEvent = new ErrorEvent('Network error');
            req.error(errorEvent);

            tick();

            expect(console.error).toHaveBeenCalled();
            expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Object));

        }));

    });

});
