import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesButtonComponent } from '@angular-task/favorites-button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'user-grid-card',
    standalone: true,
    imports: [CommonModule, CardModule, FavoritesButtonComponent],
    templateUrl: './user-grid-card.component.html',
    styleUrl: './user-grid-card.component.scss',
})
export class UserGridCardComponent {

}
