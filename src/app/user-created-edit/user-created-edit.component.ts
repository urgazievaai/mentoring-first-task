import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../services/users-service';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './user-created-edit.component.html',
  styleUrl: './user-created-edit.component.scss',
})
export class UserCreatedEditComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogData: { user: UserModel; isEdit: boolean } =
    inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);

  public readonly createUser = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.dialogData.user) {
      this.createUser.patchValue(this.dialogData.user);
    }
  }

  onSubmit(): void {
    if (this.createUser.valid) {
      this.dialogRef.close(this.createUser.value);
    }
  }
}
