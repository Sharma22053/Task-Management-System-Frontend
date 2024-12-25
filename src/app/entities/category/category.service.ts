import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category , CategoryProjection } from '../../models/category.model';
 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8091/api/categories';
 
  constructor(private http: HttpClient) {}
 
  // Create a new category
  createCategory(category: Category): Observable<Map<string, string>> {
    return this.http.post<Map<string, string>>(`${this.baseUrl}/post`, category);
  }
 
  // Get all categories
  getAllCategories(): Observable<CategoryProjection[]> {
    return this.http.get<CategoryProjection[]>(`${this.baseUrl}/all`);
  }
 
  // Get a category by ID
  getCategoryById(categoryId: number): Observable<CategoryProjection> {
    return this.http.get<CategoryProjection>(`${this.baseUrl}/${categoryId}`);
  }
 
  // Get categories with task count
  getCategoriesWithTaskCount(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/task-count`);
  }
 
  updateCategory(categoryId: number, category: { categoryName: string }): Observable<any> {
    // Ensure the URL is well-formed
    return this.http.put<any>(this.baseUrl + "/update/" + categoryId,category);
}
 
 
  // Delete a category
  deleteCategory(categoryId: number): Observable<Map<string, string>> {
    return this.http.delete<Map<string, string>>(`${this.baseUrl}/delete/${categoryId}`);
  }
}
 
 