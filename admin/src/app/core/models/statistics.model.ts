export interface DashboardStats {
  totalUsers: number;
  totalChallenges: number;
  totalSubmissions: number;
  totalVotes: number;
  activeUsers: number;
  activeChallenges: number;
}

export interface UserActivityData {
  date: string;
  newUsers: number;
  activeUsers: number;
}

export interface ChallengeStatsData {
  challengeTitle: string;
  submissionsCount: number;
  votesCount: number;
}

export interface VotingTrendsData {
  date: string;
  votes: number;
}

export interface TopUsersData {
  userName: string;
  submissions: number;
  votes: number;
  score: number;
}

export interface MonthlyGrowthData {
  month: string;
  users: number;
  challenges: number;
  submissions: number;
}