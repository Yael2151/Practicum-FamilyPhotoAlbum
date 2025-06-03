import { User } from './user.model';

export interface Image {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  challengeId: number;
  userId: number;
  createdAt: Date;
  votesCount: number;
  user?: User;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  winningImgId?: number;
  winningImg?: Image;
  ownerOfTheWinningImgId?: number;
  ownerOfTheWinningImg?: User;
  images?: Image[];
}

export interface CreateChallengeRequest {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateChallengeRequest {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  winningImgId?: number;
  ownerOfTheWinningImgId?: number;
}