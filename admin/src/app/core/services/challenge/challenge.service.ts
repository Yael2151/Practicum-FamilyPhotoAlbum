import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge, CreateChallengeRequest, UpdateChallengeRequest } from '../../models/challenge.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly API_URL = 'https://localhost:7263/api/Challenge'; // עדכן לפי הפורט שלך

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

  getLastChallenge(): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.API_URL}/last`, { 
      headers: this.getHeaders() 
    });
  }

  getPastChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.API_URL}/past`, { 
      headers: this.getHeaders() 
    });
  }

  createChallenge(challenge: CreateChallengeRequest): Observable<Challenge> {
    return this.http.post<Challenge>(`${this.API_URL}/add`, challenge, { 
      headers: this.getHeaders() 
    });
  }

  updateChallenge(id: number, challenge: UpdateChallengeRequest): Observable<Challenge> {
    return this.http.put<Challenge>(`${this.API_URL}/${id}`, challenge, { 
      headers: this.getHeaders() 
    });
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { 
      headers: this.getHeaders() 
    });
  }

  setWinningImage(challengeId: number, imageId: number, userId: number): Observable<Challenge> {
    const updateData: UpdateChallengeRequest = {
      title: '', // These will be filled by the backend
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      winningImgId: imageId,
      ownerOfTheWinningImgId: userId
    };
    
    return this.http.put<Challenge>(`${this.API_URL}/${challengeId}`, updateData, { 
      headers: this.getHeaders() 
    });
  }
}