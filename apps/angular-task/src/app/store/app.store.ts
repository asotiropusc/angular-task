import { patchState, signalStore, withMethods, withState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User, UserService } from '@angular-task/user';
import { effect, inject } from '@angular/core';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { LocalStorageService } from '@angular-task/local-storage';

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    favorites: Record<number, boolean>;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null,
    favorites: {},
};

// https://ngrx.io/guide/signals/signal-store#defining-store-methods
export const UsersStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, userService = inject(UserService)) => ({
        loadAll: rxMethod<void>(pipe(
            tap(() => patchState(store, { isLoading: true })),
            exhaustMap(() =>
                userService.getUsers().pipe(tapResponse({
                    next: (res) => patchState(store, { users: res.data, isLoading: false }),
                    error: (err: unknown) =>
                        patchState(store, {
                            error: err instanceof Error ? err.message : 'Error fetching users',
                            isLoading: false
                        })
                })))
        )),

        toggleFavorite: (id: number) => {

            patchState(store, (state) => ({
                favorites: {
                    ...state.favorites,
                    [id]: state.favorites[id] === undefined ? true : !state.favorites[id]
                }
            }));

        },
        isFavorite: (id: number) => store.favorites()[id],
        getUser: (id: number) => store.users().find((user) => user.id === id)
    })),
    withHooks({
        onInit (store) {

            store.loadAll();

            const localStorageService = inject(LocalStorageService);
            const savedFavorites = localStorageService.getItem('favorites');
            if (savedFavorites) {

                patchState(store, { favorites: JSON.parse(savedFavorites) });

            }

            effect(() => {

                const favorites = store.favorites();
                localStorageService.setItem('favorites', JSON.stringify(favorites));

            });

        }
    })
);
