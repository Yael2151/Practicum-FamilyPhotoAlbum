import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user.service';
import { User, CreateUserRequest, UpdateUserRequest } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface UserDialogData {
  mode: 'create' | 'edit';
  user?: User;
}

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css'
})
export class UserFormDialogComponent implements OnInit {
  userForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  roles = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'User', label: 'Regular User' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.data.mode === 'create') {
      this.userForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['User', Validators.required],
        isActive: [true]
      });
    } else {
      this.userForm = this.fb.group({
        name: [this.data.user?.name || '', [Validators.required, Validators.minLength(2)]],
        email: [this.data.user?.email || '', [Validators.required, Validators.email]],
        role: [this.data.user?.role || 'User', Validators.required],
        isActive: [this.data.user?.isActive || true]
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      if (this.data.mode === 'create') {
        this.createUser();
      } else {
        this.updateUser();
      }
    }
  }

    private createUser(): void {

      // const userData: CreateUserRequest = this.userForm.value;
      // console.log('Creating user with data:', this.userForm.value);


      const formValue = this.userForm.value;

      const user: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        // role: formValue.role, 
        // isDeleted: false,
        createdBy: 'admin', // או שם המשתמש המחובר
        // updatedAt: new Date().toISOString(),
        // updatedBy: 'admin', // כנ"ל
      };

      this.userService.createUser(user).subscribe({
        next: (user) => {
          // console.log('User created successfully:', user)

          this.isLoading = false;
          this.snackBar.open('User created successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log('Error creating user:', error, user);

          this.isLoading = false;
          const message = error.error?.message || 'Error creating user';
          this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }

  private updateUser(): void {
    const userData: UpdateUserRequest = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      // isActive: this.userForm.value.isActive
      UpdatedBy: 'admin' // או שם המשתמש המחובר
    };

    this.userService.updateUser(this.data.user!.id, userData).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        const message = error.error?.message || 'Error updating user';
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(field)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${this.getFieldLabel(field)} must be at least ${minLength} characters`;
    }
    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      role: 'Role'
    };
    return labels[field] || field;
  }

  get dialogTitle(): string {
    return this.data.mode === 'create' ? 'Add New User' : 'Edit User';
  }

  get submitButtonText(): string {
    return this.data.mode === 'create' ? 'Create User' : 'Update User';
  }
}