import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { User } from '../../app/core/models/auth.model';
import { AuthService } from '../../app/core/services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [
        CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  currentUser: User | null = null;
  sidenavOpened = true;

  menuItems = [
    {
      title: 'דשבורד',
      icon: 'dashboard',
      route: '/dashboard',
      active: true
    },
    {
      title: 'ניהול משתמשים',
      icon: 'people',
      route: '/users',
      active: false
    },
    {
      title: 'ניהול תחרויות',
      icon: 'photo_camera',
      route: '/challenges',
      active: false
    },
    {
      title: 'דוחות ואנליטיקה',
      icon: 'analytics',
      route: '/reports',
      active: false
    },
    {
      title: 'הגדרות מערכת',
      icon: 'settings',
      route: '/settings',
      active: false
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState$.subscribe(authState => {
      this.currentUser = authState.user;
    });
  }

  onMenuItemClick(item: any): void {
    // Reset all items
    this.menuItems.forEach(menuItem => menuItem.active = false);
    // Set clicked item as active
    item.active = true;
    // Navigate
    this.router.navigate([item.route]);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}