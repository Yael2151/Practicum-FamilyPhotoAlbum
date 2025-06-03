import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Image } from '../../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly API_URL = 'https://localhost:7263/api/Image'; // עדכן לפי הפורט שלך

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

  getImagesByChallengeId(challengeId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.API_URL}?id=${challengeId}`, { 
      headers: this.getHeaders() 
    });
  }

  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.API_URL, image, { 
      headers: this.getHeaders() 
    });
  }
}