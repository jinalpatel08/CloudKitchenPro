import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  analyzeHealth(recipeId: string, userId: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/analyze-health-35495146`,
      { recipeId, userId }
    );
  }
}
