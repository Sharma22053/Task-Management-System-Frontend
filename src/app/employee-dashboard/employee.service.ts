
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators"; 

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseUrl: string = 'http://localhost:8091/api/rbac';
  
    constructor(private httpClient: HttpClient) {}
  
   
    getProjectsByUserId(userId: number): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.baseUrl}/project/${userId}`);
    }

    getTasksByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/tasks/${userId}`);
      }

    getNotificationsByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/notifications/${userId}`);
      }

    getCommentsByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/comment/${userId}`);
      }

    getAttachmentsByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/attachments/${userId}`);
      }

    getCategoriesByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/category/${userId}`);
      }
  }
  