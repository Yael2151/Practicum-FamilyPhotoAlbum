import { Component, Inject, OnInit } from '@angular/core';
import { Challenge, Image } from '../../../core/models/challenge.model';
import { ImageService } from '../../../core/services/image/image.service';
import { ChallengeService } from '../../../core/services/challenge/challenge.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface ChallengeDetailsData {
  challenge: Challenge;
}

@Component({
  selector: 'app-challenge-details',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    // ConfirmDialogComponent
  ],
  templateUrl: './challenge-details.component.html',
  styleUrl: './challenge-details.component.css'
})
export class ChallengeDetailsComponent implements OnInit {
  images: Image[] = [];
  isLoading = false;
  selectedTab = 0;

  constructor(
    public dialogRef: MatDialogRef<ChallengeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDetailsData,
    private imageService: ImageService,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.isLoading = true;
    this.imageService.getImagesByChallengeId(this.data.challenge.id).subscribe({
      next: (images) => {
        this.images = images;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error loading images', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  selectWinner(image: Image): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Select Winner',
        message: `Are you sure you want to select this image as the winner?`,
        confirmText: 'Select',
        cancelText: 'Cancel',
        type: 'info'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setWinner(image);
      }
    });
  }

  setWinner(image: Image): void {
    this.isLoading = true;
    this.challengeService.setWinningImage(this.data.challenge.id, image.id, image.userId).subscribe({
      next: (challenge) => {
        this.data.challenge = challenge;
        this.isLoading = false;
        this.snackBar.open('Winner selected successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error selecting winner', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getStatusText(): string {
    const now = new Date();
    if (new Date(this.data.challenge.startDate) > now) {
      return 'Upcoming';
    } else if (new Date(this.data.challenge.endDate) < now) {
      return 'Ended';
    } else {
      return 'Active';
    }
  }

  hasWinner(): boolean {
    return !!this.data.challenge.winningImgId;
  }

  isWinner(image: Image): boolean {
    return image.id === this.data.challenge.winningImgId;
  }
}