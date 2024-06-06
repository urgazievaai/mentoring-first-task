import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UsersLocalStorageService {
  public getUsers(): UserModel[] | null {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : null;
  }

  public setUsers(users: UserModel[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
