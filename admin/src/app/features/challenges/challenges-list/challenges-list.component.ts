import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../../core/models/challenge.model';
import { ChallengeService } from '../../../core/services/challenge/challenge.service';
import { ChallengeFormDialogComponent } from '../challenge-form-dialog/challenge-form-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ChallengeDetailsComponent } from '../challenge-details/challenge-details.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-challenges-list',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './challenges-list.component.html',
  styleUrl: './challenges-list.component.css'
})

export class ChallengesListComponent implements OnInit {
  activeChallenge: Challenge | null = null;
  pastChallenges: Challenge[] = [];
  isLoading = false;

  constructor(
    private challengeService: ChallengeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.isLoading = true;

    // Load active challenge
    this.challengeService.getLastChallenge().subscribe({
      next: (challenge) => {
        this.activeChallenge = challenge;
        this.isLoading = false;
      },
      error: (error) => {
        this.activeChallenge = null;
        this.isLoading = false;
        // Don't show error as there might not be an active challenge
      }
    });

    // Load past challenges
    this.challengeService.getPastChallenges().subscribe({
      next: (challenges) => {
        this.pastChallenges = challenges;
      },
      error: (error) => {
        this.snackBar.open('Error loading past challenges', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ChallengeFormDialogComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChallenges();
      }
    });
  }

  openEditDialog(challenge: Challenge): void {
    const dialogRef = this.dialog.open(ChallengeFormDialogComponent, {
      width: '600px',
      data: { mode: 'edit', challenge: { ...challenge } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChallenges();
      }
    });
  }

  openDeleteDialog(challenge: Challenge): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Challenge',
        message: `Are you sure you want to delete the challenge "${challenge.title}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteChallenge(challenge.id);
      }
    });
  }

  deleteChallenge(id: number): void {
    this.challengeService.deleteChallenge(id).subscribe({
      next: () => {
        this.snackBar.open('Challenge deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadChallenges();
      },
      error: (error) => {
        this.snackBar.open('Error deleting challenge', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openDetailsDialog(challenge: Challenge): void {
    this.dialog.open(ChallengeDetailsComponent, {
      width: '900px',
      height: '80vh',
      data: { challenge }
    });
  }

  getStatusText(challenge: Challenge): string {
    const now = new Date();
    if (new Date(challenge.startDate) > now) {
      return 'Upcoming';
    } else if (new Date(challenge.endDate) < now) {
      return 'Ended';
    } else {
      return 'Active';
    }
  }

  getStatusColor(challenge: Challenge): string {
    const status = this.getStatusText(challenge);
    switch (status) {
      case 'Upcoming': return '#f39c12';
      case 'Active': return '#2ecc71';
      case 'Ended': return '#95a5a6';
      default: return '#3498db';
    }
  }

  getRemainingDays(challenge: Challenge): number {
    const now = new Date();
    const end = new Date(challenge.endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  getSubmissionsCount(challenge: Challenge): number {
    return challenge.images?.length || 0;
  }

  hasWinner(challenge: Challenge): boolean {
    return !!challenge.winningImgId;
  }
}