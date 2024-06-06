import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UsersApiService } from './users-api.service';
import { UsersLocalStorageService } from './users-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly usersApi = inject(UsersApiService);
  private readonly usersLocalStorage = inject(UsersLocalStorageService);

  //реактивное состояние которое инициализировали пуcтым массивом которое будет лежать в BehaviorSubject
  private readonly usersSubject$ = new BehaviorSubject<UserModel[]>([]);
  public readonly users$ = this.usersSubject$.asObservable(); //создали возможность считывать это состояние из внешних классов

  public removeUser(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user) => user.id !== id)
    );
  }

  public loadUsers(): void {
    const getLocalUsers = this.usersLocalStorage.getUsers();

    if (getLocalUsers) {
      this.usersSubject$.next(getLocalUsers);
    } else {
      this.usersApi.getUsers().subscribe((data: UserModel[]) => {
        this.usersSubject$.next(data);
      });
    }
  }

  public addUser(user: UserModel): void {
    const currentUser = this.usersSubject$.value; 
    const newUser = {...user, id: this.createUniqueId()} //создание нового пользователя с уникальным id
    const updateUsers = [...currentUser, newUser]; //обновление списка пользователей
    this.usersSubject$.next(updateUsers); //обновление состояния
    this.usersLocalStorage.setUsers(updateUsers); //сохпанение в localStorage
  }

  public editUser(user: UserModel): void {
    const currentUser = this.usersSubject$.value.map((u) =>
      u.id === user.id ? user : u
    );
    this.usersSubject$.next(currentUser);
    this.usersLocalStorage.setUsers(currentUser);
  }

  private createUniqueId () : number {
   const userValue = this.usersSubject$.value //получение текущих пользователей
   return userValue.length ? Math.max(...userValue.map(user => user.id)) + 1 : 1  //Проверка наличия пользователей и генерация нового id
  }
}
