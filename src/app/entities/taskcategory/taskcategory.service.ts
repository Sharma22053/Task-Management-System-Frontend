 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class TaskCategoryService {
  private baseUrl: string = 'http://localhost:8091/api/taskcategories';  // Backend API URL
 
  constructor(private http: HttpClient) { }
 
  // Method to associate task with categories
  associateTaskWithCategories(taskCategory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, taskCategory);
  }
 
  // Method to get all categories for a particular task
  getCategoriesByTaskId(taskId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${taskId}`);
  }
 
  // Method to get all tasks for a particular category
  getTasksByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${categoryId}`);
  }
}
 
 
 