import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesButtonComponent } from '@angular-task/favorites-button';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { User } from '@angular-task/user';
import { UsersStore } from '../../store/app.store';
import { Router } from '@angular/router';
import { ToastMessageService } from '@angular-task/toast-message';

@Component({
    selector: 'user-grid-card',
    standalone: true,
    imports: [CommonModule, CardModule, FavoritesButtonComponent, ButtonModule, Tag],
    templateUrl: './user-grid-card.component.html',
    styleUrl: './user-grid-card.component.scss',
})
export class UserGridCardComponent {

    @Input({ required: true }) user: User;

    store = inject(UsersStore);
    router = inject(Router);
    toastService = inject(ToastMessageService);

    navigateToUserDetail (id: number) {

        this.router.navigate(['/users', id]);

    }

    toggleFavorite (id: number) {

        this.store.toggleFavorite(id);

        const isFavorite = this.store.isFavorite(id);

        this.toastService.showFavoriteToast(this.user.name, isFavorite);

    }

}
