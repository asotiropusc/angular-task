import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { FavoritesButtonComponent } from '@angular-task/favorites-button';
import { UsersStore } from '../store/app.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { ToastMessageService } from '@angular-task/toast-message';

@Component({
    selector: 'user-detail',
    standalone: true,
    imports: [CommonModule, CardModule, Tag, FavoritesButtonComponent, Avatar],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {

    readonly store = inject(UsersStore);
    private readonly route = inject(ActivatedRoute);
    private readonly toastService = inject(ToastMessageService);

    user = toSignal(this.route.paramMap.pipe(
        map((params) => params.get('id')),
        filter((id) => id !== null),
        map((id) => this.store.getUser(+id))
    ));

    toggleFavorite (id: number) {

        this.store.toggleFavorite(id);
        const isFavorite = this.store.isFavorite(id);
        const user = this.user();

        if (!user) {

            return;

        }
        this.toastService.showFavoriteToast(user.name, isFavorite);

    }

}
