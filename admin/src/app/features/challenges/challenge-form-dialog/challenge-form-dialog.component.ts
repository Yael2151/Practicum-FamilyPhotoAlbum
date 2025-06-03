import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChallengeService } from '../../../core/services/challenge/challenge.service';
import { Challenge, CreateChallengeRequest, UpdateChallengeRequest } from '../../../core/models/challenge.model';
import { CommonModule } from '@angular/common';

export interface ChallengeDialogData {
  mode: 'create' | 'edit';
  challenge?: Challenge;
}

@Component({
  selector: 'app-challenge-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './challenge-form-dialog.component.html',
  styleUrl: './challenge-form-dialog.component.css'
})
export class ChallengeFormDialogComponent implements OnInit {
  challengeForm!: FormGroup;
  isLoading = false;
  minStartDate = new Date();
  minEndDate = new Date();

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChallengeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData
  ) {
    // Set min end date to tomorrow
    this.minEndDate.setDate(this.minEndDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.data.mode === 'create') {
      // Default end date is 7 days from now
      const defaultEndDate = new Date();
      defaultEndDate.setDate(defaultEndDate.getDate() + 7);

      this.challengeForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        startDate: [new Date(), Validators.required],
        endDate: [defaultEndDate, Validators.required]
      });
    } else {
      this.challengeForm = this.fb.group({
        title: [this.data.challenge?.title || '', [Validators.required, Validators.minLength(3)]],
        description: [this.data.challenge?.description || '', [Validators.required, Validators.minLength(10)]],
        startDate: [new Date(this.data.challenge?.startDate || ''), Validators.required],
        endDate: [new Date(this.data.challenge?.endDate || ''), Validators.required]
      });
    }

    // Update min end date when start date changes
    this.challengeForm.get('startDate')?.valueChanges.subscribe(date => {
      const startDate = new Date(date);
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);

      this.minEndDate = nextDay;

      const currentEndDate = this.challengeForm.get('endDate')?.value;
      if (currentEndDate && new Date(currentEndDate) <= startDate) {
        this.challengeForm.get('endDate')?.setValue(nextDay);
      }
    });
  }

  onSubmit(): void {
    if (this.challengeForm.valid) {
      this.isLoading = true;

      if (this.data.mode === 'create') {
        this.createChallenge();
      } else {
        this.updateChallenge();
      }
    }
  }

  private createChallenge(): void {
    const challengeData: CreateChallengeRequest = this.challengeForm.value;

    this.challengeService.createChallenge(challengeData).subscribe({
      next: (challenge) => {
        this.isLoading = false;
        this.snackBar.open('Challenge created successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        const message = error.error?.message || 'Error creating challenge';
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private updateChallenge(): void {
    const challengeData: UpdateChallengeRequest = {
      title: this.challengeForm.value.title,
      description: this.challengeForm.value.description,
      startDate: this.challengeForm.value.startDate,
      endDate: this.challengeForm.value.endDate,
      winningImgId: this.data.challenge?.winningImgId,
      ownerOfTheWinningImgId: this.data.challenge?.ownerOfTheWinningImgId
    };

    this.challengeService.updateChallenge(this.data.challenge!.id, challengeData).subscribe({
      next: (challenge) => {
        this.isLoading = false;
        this.snackBar.open('Challenge updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        const message = error.error?.message || 'Error updating challenge';
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
    const control = this.challengeForm.get(field);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(field)} is required`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${this.getFieldLabel(field)} must be at least ${minLength} characters`;
    }
    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      title: 'Title',
      description: 'Description',
      startDate: 'Start date',
      endDate: 'End date'
    };
    return labels[field] || field;
  }

  get dialogTitle(): string {
    return this.data.mode === 'create' ? 'Create New Challenge' : 'Edit Challenge';
  }

  get submitButtonText(): string {
    return this.data.mode === 'create' ? 'Create Challenge' : 'Update Challenge';
  }
}