import { Component, computed, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../store/app.store';
import { UserGridCardComponent } from './user-grid-card/user-grid-card.component';
import { SelectButton } from 'primeng/selectbutton';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '@angular-task/user';
import { EmptyStateComponent } from '@angular-task/empty-state';
import { Subject, takeUntil } from 'rxjs';

type Filter = 'all' | 'favorite' | 'non-favorite';

interface SelectOption {
    label: string,
    value: Filter
}

@Component({
    selector: 'user-grid',
    standalone: true,
    imports: [CommonModule, UserGridCardComponent, SelectButton, ReactiveFormsModule, EmptyStateComponent],
    templateUrl: './user-grid.component.html',
    styleUrl: './user-grid.component.scss',
})
export class UserGridComponent implements OnInit, OnDestroy {

    store = inject(UsersStore);

    destroy$ = new Subject<void>();

    filterSignal = signal<Filter>('all');

    filteredUsers = computed(() => {

        const favorites = this.store.favorites();

        const filtered = this.store.users().filter((user) => {

            switch(this.filterSignal()) {

                case 'favorite':
                    return favorites[user.id];
                case 'non-favorite':
                    return !favorites[user.id];
                default:
                    return true;

            }

        });

        const rows: User[][] = [];
        for (let i = 0; i < filtered.length; i += 2) {

            rows.push(filtered.slice(i, i + 2));

        }

        return rows;

    });

    stateOptions: SelectOption[] = [
        { label: 'All', value: 'all' },
        { label: 'Favorites', value: 'favorite' },
        { label: 'Non-Favorites', value: 'non-favorite' }
    ];

    formGroup = new FormGroup({
        filter: new FormControl<Filter>('all', { nonNullable: true })
    });

    get emptyStateMessage (): string {

        switch (this.filterSignal()) {

            case 'favorite':
                return 'You haven\'t favorited any users yet.';
            case 'non-favorite':
                return 'All users are in your favorites.';
            default:
                return 'No users found.';

        }

    }

    ngOnInit (): void {

        const filterControl = this.formGroup.controls.filter;

        filterControl.valueChanges
        .pipe(takeUntil(this.destroy$)).subscribe((value) => {

            this.filterSignal.set(value);

        });

    }

    ngOnDestroy (): void {

        this.destroy$.next();
        this.destroy$.complete();

    }

}
