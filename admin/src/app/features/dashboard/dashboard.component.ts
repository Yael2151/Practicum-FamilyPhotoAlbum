import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [
        CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgFor,          // מה־@angular/common
    DatePipe   
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  // Statistics Cards Data
  statsCards = [
    {
      title: 'סך המשתמשים',
      value: '1,234',
      icon: 'people',
      color: '#3498db',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'תחרויות פעילות',
      value: '8',
      icon: 'photo_camera',
      color: '#2ecc71',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'תמונות שהועלו השבוע',
      value: '456',
      icon: 'image',
      color: '#f39c12',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'הצבעות השבוע',
      value: '2,891',
      icon: 'how_to_vote',
      color: '#e74c3c',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  // Recent Activities
  recentActivities = [
    {
      type: 'user_joined',
      message: 'משתמש חדש הצטרף למערכת',
      user: 'יוסי כהן',
      time: 'לפני 5 דקות',
      icon: 'person_add',
      color: '#3498db'
    },
    {
      type: 'image_uploaded',
      message: 'תמונה חדשה הועלתה לתחרות',
      user: 'שרה לוי',
      time: 'לפני 12 דקות',
      icon: 'photo_camera',
      color: '#2ecc71'
    },
    {
      type: 'vote_cast',
      message: 'הצבעה חדשה נרשמה',
      user: 'דוד אברהם',
      time: 'לפני 18 דקות',
      icon: 'how_to_vote',
      color: '#f39c12'
    },
    {
      type: 'challenge_created',
      message: 'תחרות חדשה נוצרה',
      user: 'מנהל המערכת',
      time: 'לפני שעה',
      icon: 'add_circle',
      color: '#9b59b6'
    }
  ];

  // Top Challenges
  topChallenges = [
    {
      title: 'נוף ישראלי',
      submissions: 45,
      votes: 234,
      endDate: new Date('2024-01-15'),
      status: 'active'
    },
    {
      title: 'צילום רחוב',
      submissions: 38,
      votes: 189,
      endDate: new Date('2024-01-08'),
      status: 'ended'
    },
    {
      title: 'פורטרט',
      submissions: 52,
      votes: 301,
      endDate: new Date('2024-01-01'),
      status: 'ended'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // כאן נוכל לטעון נתונים אמיתיים מהשרת
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'ended': return '#95a5a6';
      default: return '#3498db';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'פעילה';
      case 'ended': return 'הסתיימה';
      default: return 'לא ידוע';
    }
  }
}