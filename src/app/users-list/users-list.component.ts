import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service';
import { UsersCardComponent } from '../users-card/users-card/users-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserCreatedEditComponent } from '../user-created-edit/user-created-edit.component';
import { UserModel } from '../models/user-model';
import { UsersLocalStorageService } from '../services/users-local-storage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    UsersCardComponent,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    //код инициализации, сделали запрос на бэк и заполнили сервис данными
    this.usersService.loadUsers();
  }

  onDeleteUser(id: number): void {
    this.usersService.removeUser(id);
  }

  public openCreateEditDialog(user?: UserModel): void {
    const isEdit = Boolean(user); //проверка пользователя, переменная isEdit получает значение true, если параметр user существует (не null и не undefined), иначе false.

    const dialogRef = this.dialog.open(UserCreatedEditComponent, {
      data: { user, isEdit },
    }); //Открывается окно и передается данные

    dialogRef.afterClosed().subscribe((editUser?: UserModel) => {
      if (!editUser) return; // проверка на наличие editUser

      isEdit
        ? this.usersService.editUser(editUser)
        : this.usersService.addUser(editUser);
    });
  }
}