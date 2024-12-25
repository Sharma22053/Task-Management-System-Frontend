 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
 
  private apiUrl = 'http://localhost:8091/api/userrole';  // Corrected URL
 
  constructor(private http: HttpClient) { }
 
  // Get all user roles
  getAllUserRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
 
  // Get user role by ID
  getUserRoleById(userRoleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userRoleId}`);
  }
 
  // Create new user role
  createUserRole(userRole: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, userRole);
  }
 
  // Update user role
  updateUserRole(userRole: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userRole.userRoleId}`, userRole);
  }
 
  // Delete user role
  deleteUserRole(userRoleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userRoleId}`);
 }
 
}
 
 
 