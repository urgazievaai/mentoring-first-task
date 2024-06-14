import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsersCardComponent } from '../users-card/users-card/users-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserCreatedEditComponent } from '../user-created-edit/user-created-edit.component';
import { UserModel } from '../models/user-model';
import { Store } from '@ngrx/store';
import {
  addUser,
  addUserSuccess,
  deleteUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  updateUser,
  updateUserSuccess,
} from '../state/users/users.action';
import { selectUsers } from '../state/users/users.selectors';
import { UserState } from '../state/users/users.reducer';
import { UsersApiService } from '../services/users-api.service';

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
  private readonly store = inject(Store);
  public readonly usersApi = inject(UsersApiService);
  public readonly users$ = this.store.select(selectUsers);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }

  onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({ id }));
  }

  public openCreateEditDialog(user?: UserModel): void {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(UserCreatedEditComponent, {
      data: { user, isEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      isEdit
        ? this.store.dispatch(
            updateUserSuccess({ userData: { ...user, ...result } })
          )
        : this.store.dispatch(addUserSuccess({ userData: result }));

      console.log({ ...user, ...result });
    });
  }
}
