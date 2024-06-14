import { UserModel } from '../../models/user-model';

export interface UserState {
  users: UserModel[];
  error: any;
}

export const initialUserState: UserState = {
  users: [],
  error: null
};