import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AsyncPipe, NgIf, NgFor, DecimalPipe } from '@angular/common';
import { StatisticsService } from '../../core/services/statistics/statistics.service';
import { 
  DashboardStats, 
  UserActivityData, 
  ChallengeStatsData, 
  VotingTrendsData, 
  TopUsersData,
  MonthlyGrowthData 
} from '../../core/models/statistics.model';

@Component({
  selector: 'app-reports',
  imports: [
    CommonModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  NgxChartsModule,
  NgIf,
  // NgFor,
  // AsyncPipe,
  DecimalPipe
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dashboardStats: DashboardStats | null = null;
  isLoading = false;

  // Chart data
  userActivityData: any[] = [];
  challengeStatsData: any[] = [];
  votingTrendsData: any[] = [];
  topUsersData: any[] = [];
  monthlyGrowthData: any[] = [];

  // Chart options
  // chartColorScheme = {
  //   domain: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c']
  // };


chartColorScheme: Color = {
  name: 'customScheme',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};


  // Chart configurations
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  animations = true;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.isLoading = true;

    // Load dashboard stats
    this.statisticsService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });

    // Load user activity data
    this.statisticsService.getUserActivityData().subscribe({
      next: (data) => {
        this.userActivityData = [
          {
            name: 'New Users',
            series: data.map(item => ({
              name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              value: item.newUsers
            }))
          },
          {
            name: 'Active Users',
            series: data.map(item => ({
              name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              value: item.activeUsers
            }))
          }
        ];
      },
      error: (error) => {
        console.error('Error loading user activity data:', error);
      }
    });

    // Load challenge stats
    this.statisticsService.getChallengeStats().subscribe({
      next: (data) => {
        this.challengeStatsData = data.map(item => ({
          name: item.challengeTitle,
          value: item.submissionsCount
        }));
      },
      error: (error) => {
        console.error('Error loading challenge stats:', error);
      }
    });

    // Load voting trends
    this.statisticsService.getVotingTrends().subscribe({
      next: (data) => {
        this.votingTrendsData = data.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: item.votes
        }));
      },
      error: (error) => {
        console.error('Error loading voting trends:', error);
      }
    });

    // Load top users
    this.statisticsService.getTopUsers().subscribe({
      next: (data) => {
        this.topUsersData = data.map(item => ({
          name: item.userName,
          value: item.score
        }));
      },
      error: (error) => {
        console.error('Error loading top users:', error);
      }
    });

    // Load monthly growth
    this.statisticsService.getMonthlyGrowth().subscribe({
      next: (data) => {
        this.monthlyGrowthData = [
          {
            name: 'Users',
            series: data.map(item => ({
              name: item.month,
              value: item.users
            }))
          },
          {
            name: 'Submissions',
            series: data.map(item => ({
              name: item.month,
              value: item.submissions
            }))
          }
        ];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading monthly growth:', error);
        this.isLoading = false;
      }
    });
  }

  onSelect(event: any): void {
    console.log('Chart selection:', event);
  }

  onActivate(event: any): void {
    console.log('Chart activate:', event);
  }

  onDeactivate(event: any): void {
    console.log('Chart deactivate:', event);
  }

  exportData(format: 'csv' | 'pdf'): void {
    // TODO: Implement data export functionality
    console.log(`Exporting data as ${format}`);
  }

  refreshData(): void {
    this.loadAllData();
  }
}