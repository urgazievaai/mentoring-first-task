import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss',
})
export class UsersCardComponent {
  @Input() userModel!: UserModel;

  @Output() deleteUser = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.userModel.id);
  }
}
