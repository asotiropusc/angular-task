import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'favorites-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './favorites-button.component.html',
    styleUrl: './favorites-button.component.scss',
})
export class FavoritesButtonComponent {
	@Input() isFavorited: boolean = false;
	@Output() toggledFavorite = new EventEmitter<void>();

	get favoriteIconStyle(): string {
		return this.isFavorited ? 'pi pi-star-filled' : 'pi pi-star';
	}

	toggle() {
		this.toggledFavorite.emit();
	}
}
