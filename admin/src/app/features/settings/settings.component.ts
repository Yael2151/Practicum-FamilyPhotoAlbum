import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipOption, MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-settings',
  imports: [
        CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  generalForm!: FormGroup;
  emailForm!: FormGroup;
  securityForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.generalForm = this.fb.group({
      siteName: ['Photo Challenge Platform', Validators.required],
      siteDescription: ['Weekly photo challenges for creative photographers', Validators.required],
      maxFileSize: [5, [Validators.required, Validators.min(1), Validators.max(50)]],
      allowedFormats: [['jpg', 'jpeg', 'png'], Validators.required],
      challengeDuration: [7, [Validators.required, Validators.min(1), Validators.max(30)]]
    });

    this.emailForm = this.fb.group({
      smtpHost: ['smtp.gmail.com', Validators.required],
      smtpPort: [587, [Validators.required, Validators.min(1), Validators.max(65535)]],
      smtpUsername: ['', [Validators.required, Validators.email]],
      smtpPassword: ['', Validators.required],
      fromEmail: ['noreply@photochallenge.com', [Validators.required, Validators.email]],
      fromName: ['Photo Challenge Platform', Validators.required]
    });

    this.securityForm = this.fb.group({
      requireEmailVerification: [true],
      allowGuestVoting: [false],
      maxVotesPerUser: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      enableRateLimiting: [true],
      sessionTimeout: [60, [Validators.required, Validators.min(15), Validators.max(480)]]
    });
  }

  onSaveGeneral(): void {
    if (this.generalForm.valid) {
      this.isLoading = true;
      // TODO: Implement save functionality
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('General settings saved successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }, 1000);
    }
  }

  onSaveEmail(): void {
    if (this.emailForm.valid) {
      this.isLoading = true;
      // TODO: Implement save functionality
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Email settings saved successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }, 1000);
    }
  }

  onSaveSecurity(): void {
    if (this.securityForm.valid) {
      this.isLoading = true;
      // TODO: Implement save functionality
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Security settings saved successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }, 1000);
    }
  }

  onTestEmail(): void {
    this.snackBar.open('Test email sent successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  onResetToDefaults(): void {
    this.initForms();
    this.snackBar.open('Settings reset to defaults', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}