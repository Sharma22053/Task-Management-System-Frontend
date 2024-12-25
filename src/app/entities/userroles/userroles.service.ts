import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRoles } from '../../models/userroles.model';
import { UserRoleProjection } from '../../models/userrole.model';
 
@Injectable({
  providedIn: 'root',
})
export class UserRolesService {
  private apiUrl = 'http://localhost:8091/api/userroles';
 
  constructor(private http: HttpClient) {}
 
  // Assign a user role
  assignUserRole(userRoles: UserRoles): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(`${this.apiUrl}/assign`, userRoles);
  }
 
  // Get all user roles
  getAllUserRoles(): Observable<UserRoleProjection[]> {
    return this.http.get<UserRoleProjection[]>(`${this.apiUrl}/all`);
  }
 
  // Get user roles by user ID
  getUserRolesByUserId(userId: number): Observable<UserRoleProjection[]> {
    return this.http.get<UserRoleProjection[]>(`${this.apiUrl}/user/${userId}`);
  }
 
  // Revoke a user role
 // Revoke a user role
revokeUserRole(userRoleId: number, userId: number): Observable<{ [key: string]: string }> {
  return this.http.delete<{ [key: string]: string }>(
    `${this.apiUrl}/revoke/${userRoleId}/${userId}`
  );
}
 
  }
 