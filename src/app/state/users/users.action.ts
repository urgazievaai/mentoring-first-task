import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";
import { UserModel } from "../../models/user-model";


export const loadUser = createAction('[User] Load Users');
export const loadUserSuccess = createAction('[Users] Load Users Succes', props<{users: UserModel[]}>());
export const loadUserFailure = createAction('[Users] Load Users Failure', props<{error: string}>());

export const addUser = createAction('[Users] Add User', props<{userData: UserModel}>());
export const addUserSuccess = createAction('[Users] Add User Sucess', props<{userData: UserModel}>());
export const addUserFailure = createAction('[Users] Add User Failure', props<{error: string}>());



export const deleteUser = createAction('[Users] Delete User', props<{id: number}>());
export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{error: string}>());

export const updateUser = createAction('[Users] Update User', props<{userData: UserModel}>());
export const updateUserSuccess = createAction('[Users] Update User Success', props<{userData: UserModel}>());
export const updateUserFailure = createAction('[Users] Update User Failure', props<{error: string}>());

