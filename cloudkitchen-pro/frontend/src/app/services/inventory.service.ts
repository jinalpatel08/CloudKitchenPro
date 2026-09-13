import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Inventory {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // List all items for a user
  getInventory(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventory-35495146?userId=${userId}`);
  }

  // Get one item by id
  getItemById(inventoryId: string, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventory-35495146?userId=${userId}&inventoryId=${inventoryId}`);
  }

  // Create
  addItem(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-inventory-35495146`, item);
  }

  // Update
  updateItem(item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-inventory-35495146`, item);
  }

  // Delete
  deleteItem(inventoryId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-inventory-35495146?inventoryId=${inventoryId}&userId=${userId}`);
  }
}
