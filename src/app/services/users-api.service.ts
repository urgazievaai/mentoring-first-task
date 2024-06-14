import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() {}

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  public postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  public deleteUser(userId: number): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.apiUrl}/${userId}`)
  }

  public updateUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user)
  }
}
