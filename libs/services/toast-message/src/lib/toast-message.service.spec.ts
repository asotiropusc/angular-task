import { TestBed } from '@angular/core/testing';
import { ToastMessageService } from './toast-message.service';
import { MessageService } from 'primeng/api';

describe('ToastMessageService', () => {

    let service: ToastMessageService;
    let messageService: jest.Mocked<MessageService>;

    beforeEach(() => {

        messageService = {
            add: jest.fn(),
        } as unknown as jest.Mocked<MessageService>;

        TestBed.configureTestingModule({
            providers: [
                ToastMessageService,
                { provide: MessageService, useValue: messageService }
            ]
        });

        service = TestBed.inject(ToastMessageService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('showToast', () => {

        it('should call messageService.add with default parameters', () => {

            service.showToast('Test Summary', 'Test Detail');

            expect(messageService.add).toHaveBeenCalledWith({
                severity: 'contrast',
                summary: 'Test Summary',
                detail: 'Test Detail',
                key: 'global',
                life: 2000,
                closable: false
            });

        });

        it('should call messageService.add with custom parameters', () => {

            service.showToast('Test Summary', 'Test Detail', 'error', 5000, true, 'custom-key');

            expect(messageService.add).toHaveBeenCalledWith({
                severity: 'error',
                summary: 'Test Summary',
                detail: 'Test Detail',
                key: 'custom-key',
                life: 5000,
                closable: true
            });

        });

    });

    describe('showFavoriteToast', () => {

        it('should show success toast when adding favorite', () => {

            service.showFavoriteToast('John Doe', true);

            expect(messageService.add).toHaveBeenCalledWith({
                severity: 'success',
                summary: 'Added Favorite',
                detail: 'You added John Doe to your favorites.',
                key: 'global',
                life: 2000,
                closable: false
            });

        });

        it('should show warning toast when removing favorite', () => {

            service.showFavoriteToast('John Doe', false);

            expect(messageService.add).toHaveBeenCalledWith({
                severity: 'warn',
                summary: 'Removed Favorite',
                detail: 'You removed John Doe from your favorites.',
                key: 'global',
                life: 2000,
                closable: false
            });

        });

    });

});
