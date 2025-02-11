import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

type Severity = 'secondary' | 'warn';

@Component({
    selector: 'favorites-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './favorites-button.component.html',
    styleUrl: './favorites-button.component.scss',
})
export class FavoritesButtonComponent {

    @Input() isFavorited = false;
    @Output() toggledFavorite = new EventEmitter<void>();

    get favoriteIconStyle (): string {

        return this.isFavorited ? 'pi pi-star-fill' : 'pi pi-star';

    }

    get severity (): Severity {

        return this.isFavorited ? 'warn' : 'secondary';

    }

    toggle () {

        this.toggledFavorite.emit();

    }

}
