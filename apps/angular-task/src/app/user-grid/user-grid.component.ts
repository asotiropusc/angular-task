import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../store/app.store';
import { UserGridCardComponent } from './user-grid-card/user-grid-card.component';

@Component({
    selector: 'user-grid',
    standalone: true,
    imports: [CommonModule, UserGridCardComponent],
    templateUrl: './user-grid.component.html',
    styleUrl: './user-grid.component.scss',
})
export class UserGridComponent implements OnInit {
	store = inject(UsersStore);

	
	ngOnInit(): void {
		this.store.loadAll();
	}
}
