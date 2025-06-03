import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ChallengeStatsData, DashboardStats, MonthlyGrowthData, TopUsersData, UserActivityData, VotingTrendsData } from '../../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly API_URL = 'https://localhost:7240/api/stats'; // עדכן לפי הפורט שלך

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // For now, we'll use mock data since you don't have these endpoints yet
  // You can replace these with real API calls later

  getDashboardStats(): Observable<DashboardStats> {
    // TODO: Replace with real API call
    // return this.http.get<DashboardStats>(`${this.API_URL}/overview`, { headers: this.getHeaders() });
    
    const mockStats: DashboardStats = {
      totalUsers: 1247,
      totalChallenges: 23,
      totalSubmissions: 892,
      totalVotes: 3456,
      activeUsers: 234,
      activeChallenges: 3
    };
    return of(mockStats);
  }

  getUserActivityData(): Observable<UserActivityData[]> {
    // TODO: Replace with real API call
    // return this.http.get<UserActivityData[]>(`${this.API_URL}/user-activity`, { headers: this.getHeaders() });
    
    const mockData: UserActivityData[] = [
      { date: '2024-01-01', newUsers: 12, activeUsers: 45 },
      { date: '2024-01-02', newUsers: 8, activeUsers: 52 },
      { date: '2024-01-03', newUsers: 15, activeUsers: 48 },
      { date: '2024-01-04', newUsers: 23, activeUsers: 67 },
      { date: '2024-01-05', newUsers: 18, activeUsers: 71 },
      { date: '2024-01-06', newUsers: 31, activeUsers: 89 },
      { date: '2024-01-07', newUsers: 27, activeUsers: 94 }
    ];
    return of(mockData);
  }

  getChallengeStats(): Observable<ChallengeStatsData[]> {
    // TODO: Replace with real API call
    // return this.http.get<ChallengeStatsData[]>(`${this.API_URL}/challenge-stats`, { headers: this.getHeaders() });
    
    const mockData: ChallengeStatsData[] = [
      { challengeTitle: 'Street Photography', submissionsCount: 45, votesCount: 234 },
      { challengeTitle: 'Nature Landscapes', submissionsCount: 38, votesCount: 189 },
      { challengeTitle: 'Portrait Challenge', submissionsCount: 52, votesCount: 301 },
      { challengeTitle: 'Urban Architecture', submissionsCount: 29, votesCount: 156 },
      { challengeTitle: 'Wildlife Photography', submissionsCount: 41, votesCount: 278 }
    ];
    return of(mockData);
  }

  getVotingTrends(): Observable<VotingTrendsData[]> {
    const mockData: VotingTrendsData[] = [
      { date: '2024-01-01', votes: 45 },
      { date: '2024-01-02', votes: 52 },
      { date: '2024-01-03', votes: 48 },
      { date: '2024-01-04', votes: 67 },
      { date: '2024-01-05', votes: 71 },
      { date: '2024-01-06', votes: 89 },
      { date: '2024-01-07', votes: 94 },
      { date: '2024-01-08', votes: 78 },
      { date: '2024-01-09', votes: 85 },
      { date: '2024-01-10', votes: 92 }
    ];
    return of(mockData);
  }

  getTopUsers(): Observable<TopUsersData[]> {
    const mockData: TopUsersData[] = [
      { userName: 'John Smith', submissions: 12, votes: 234, score: 95 },
      { userName: 'Sarah Johnson', submissions: 8, votes: 189, score: 87 },
      { userName: 'Mike Wilson', submissions: 15, votes: 301, score: 92 },
      { userName: 'Emma Davis', submissions: 6, votes: 156, score: 78 },
      { userName: 'David Brown', submissions: 11, votes: 278, score: 89 }
    ];
    return of(mockData);
  }

  getMonthlyGrowth(): Observable<MonthlyGrowthData[]> {
    const mockData: MonthlyGrowthData[] = [
      { month: 'Jan', users: 120, challenges: 3, submissions: 89 },
      { month: 'Feb', users: 145, challenges: 4, submissions: 112 },
      { month: 'Mar', users: 178, challenges: 5, submissions: 156 },
      { month: 'Apr', users: 203, challenges: 4, submissions: 134 },
      { month: 'May', users: 234, challenges: 6, submissions: 189 },
      { month: 'Jun', users: 267, challenges: 5, submissions: 201 }
    ];
    return of(mockData);
  }
}