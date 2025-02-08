import { patchState, signalStore, withMethods, withState, withComputed } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User, UserService } from '@angular-task/user';
import { computed, inject } from '@angular/core';
import { tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export type Filter = 'all' | 'favorite' | 'non-favorite';

interface UserState {
	users: User[];
	isLoading: boolean;
	filter: Filter;
	error: string | null;
	favorites: Set<number>;
}

const initialState: UserState = {
	users: [] as User[],
	isLoading: false,
	filter: 'all',
	error: null,
	favorites: new Set<number>(),
}

// https://ngrx.io/guide/signals/signal-store#defining-store-methods
export const UsersStore = signalStore(
	{ providedIn: 'root', protectedState: false },
	withState(initialState),
	withMethods((store, userService = inject(UserService)) => ({
		loadAll: rxMethod<void>(() => 
			userService.getUsers().pipe(
				tap(() => patchState(store, { isLoading: true })),
				tapResponse({
					next: (res) => patchState(store, { users: res.data, isLoading: false }),
					error: () => patchState(store, { error: 'Error fetching users', isLoading: false }),
				})
			)
		),
		toggleFavorite: (id: number) => {
			const currFaves = store.favorites();
			const newFaves = new Set(currFaves);

			if (newFaves.has(id)) {
				newFaves.delete(id);
			} else {	
				newFaves.add(id);
			}

			patchState(store, { favorites: newFaves });
		},
		setFilter: (filter: Filter) => patchState(store, { filter }),
		isFavorite: (id: number) => store.favorites().has(id),
		hasUser: (id: number) => store.users().some(user => user.id === id),
		getUser: (id: number) => store.users().find(user => user.id === id),
	})),
	withComputed((state) => ({
		filteredUsers: computed(() => {
			const users = state.users();
			const favorites = state.favorites();

			switch (state.filter()) {
				case 'favorite':
					return users.filter(user => favorites.has(user.id));
				case 'non-favorite':
					return users.filter(user => !favorites.has(user.id));
				default:
					return users;
			}	
		}),
	}))
);