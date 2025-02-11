import { patchState, signalStore, withMethods, withState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User, UserService } from '@angular-task/user';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export type Filter = 'all' | 'favorite' | 'non-favorite';

interface UserState {
    users: User[];
    isLoading: boolean;
    filter: Filter;
    error: string | null;
    favorites: Record<number, boolean>;
}

const initialState: UserState = {
    users: [] as User[],
    isLoading: false,
    filter: 'all',
    error: null,
    favorites: {} as Record<number, boolean>,
};

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
                    error: (err: unknown) =>
                        patchState(store, {
                            error: err instanceof Error ? err.message : 'Error fetching users',
                            isLoading: false
                        }),
                })
            )),
        toggleFavorite: (id: number) => {

            patchState(store, (state) => ({
                favorites: {
                    ...state.favorites,
                    [id]: state.favorites[id] === undefined ? true : !state.favorites[id]
                }
            }));

        },
        setFilter: (filter: Filter) => {

            patchState(store, { filter });

        },
        isFavorite: (id: number) => store.favorites()[id],
        getUser: (id: number) => store.users().find((user) => user.id === id)
    })),
    withHooks({
        onInit (store) {

            store.loadAll();

        }
    })
);
