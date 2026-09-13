import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Recipe {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getRecipes(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes-35495146?userId=${userId}`);
  }

  addRecipe(recipe: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-recipe-35495146`, recipe);
  }

  updateRecipe(recipe: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-recipe-35495146`, recipe);
  }

  deleteRecipe(recipeId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-recipe-35495146?recipeId=${recipeId}&userId=${userId}`);
  }

  getRecipeById(recipeId: string, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipe-35495146?userId=${userId}&recipeId=${recipeId}`);
  }
}
