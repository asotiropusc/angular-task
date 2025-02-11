import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type Severity = 'success' | 'info' | 'warn' | 'error' | 'contrast';

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    private messageService = inject(MessageService);

    showToast (
        summary: string,
        detail: string,
        severity: Severity = 'contrast',
        life = 2000,
        closable = false,
        key = 'global'
    ) {

        this.messageService.add({ severity, summary, detail, key, life, closable });

    }

    showFavoriteToast (userName: string, isFavorite: boolean) {

        this.showToast(
            `${isFavorite ? 'Added' : 'Removed'} Favorite`,
            `You ${isFavorite ? 'added' : 'removed'} ${userName} ${isFavorite ? 'to' : 'from'} your favorites.`,
            isFavorite ? 'success' : 'warn'
        );

    }

}
