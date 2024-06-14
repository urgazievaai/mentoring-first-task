import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { UsersApiService } from '../../services/users-api.service';
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './users.action';
import { Action } from '@ngrx/store';

export const loadUsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApi = inject(UsersApiService);
    return actions$.pipe(
      ofType(loadUser),
      switchMap(() => {
        return usersApi.getUsers().pipe(
          map((users) => {
            return loadUserSuccess({ users });
          }),
          catchError((error) => {
            return of(loadUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const addUsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApi = inject(UsersApiService);

    return actions$.pipe(
      ofType(addUser),
      switchMap(({ userData }) => {
        return usersApi.postUser(userData).pipe(
          map((user) => addUserSuccess({ userData: { ...user } })),
          catchError((error) => of(addUserFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const deleteUserEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApi = inject(UsersApiService);

    return actions$.pipe(
      ofType(deleteUser),
      switchMap(({ id }) => {
        return usersApi.deleteUser(id).pipe(
          map(() => deleteUser({ id })),
          catchError((error) => of(deleteUserFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const updateUsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApi = inject(UsersApiService);

    return actions$.pipe(
      ofType(updateUser),
      switchMap(({ userData }) => {
        return usersApi.updateUser(userData).pipe(
          map((user) => updateUserSuccess({ userData: { ...user } })),
          catchError((error) => of(updateUserFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);
