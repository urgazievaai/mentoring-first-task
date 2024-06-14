import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserModel } from '../../models/user-model';
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './users.action';

export interface UserState {
  users: UserModel[];
  error: any;
}

export const initialUserState: UserState = {
  users: [],
  error: null,
};

export const USERS_FEATURE_KEY = 'users';

export const reducer = createReducer(
  initialUserState,

  on(loadUser, (state) => ({ ...state })),

  on(loadUserSuccess, (state, { users }) => ({
    ...state,
    users,
  })),

  on(loadUserFailure, (state, { error }) => ({ ...state })),

  on(addUser, (state) => ({ ...state })),

  on(addUserSuccess, (state, { userData }) => {
    const newUser = {
      ...userData,
      id: userData.id || new Date().getTime()
    }
    
   return {
      ...state,
      users: [...state.users, newUser]
  }
}),

  on(addUserFailure, (state, { error }) => ({ ...state })),

  on(deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),

  on(updateUser, (state) => ({ ...state })),


  on(updateUserSuccess, (state, { userData }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === userData.id ? {...user, ...userData} : user
    ),
  })),

  on(updateUserFailure, (state, { error }) => ({ ...state }))
);
