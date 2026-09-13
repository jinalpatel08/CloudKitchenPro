import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  translateRecipe(recipeId: string, userId: string, targetLang: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/translate-recipe-35495146`, {
      recipeId,
      userId,
      targetLang
    });
  }
}
