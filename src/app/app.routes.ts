import { Routes } from '@angular/router';
import { UsersCardComponent } from './users-card/users-card/users-card.component';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users-card',
    component: UsersCardComponent,
  },
];
