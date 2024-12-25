 import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User, UserProjection } from "../../models/user.model";
 
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static url: string = "http://localhost:8091/api/users";  // Ensure this is your correct API base URL
 
    constructor(private httpClient: HttpClient) {}
 
    // Error handler
    private errorHandler(error: HttpErrorResponse): Observable<any> {
        if (error.status == 0) {
            alert("Client side error");
        } else {
            alert(
                "Error message: " + error.message +
                "\nError name: " + error.name +
                "\nError status: " + error.status
            );
        }
        return throwError(() => new Error(error.message));
    }
 
    // Create a new user
    public createNewUser(user: User): Observable<void> {
        return this.httpClient.post<void>(`${UserService.url}/post`, user)
            .pipe(catchError(this.errorHandler));
    }
 
    // Get a list of all users
    public getListOfAllUsers(): Observable<UserProjection[]> {
        return this.httpClient.get<UserProjection[]>(`${UserService.url}/all`)
            .pipe(catchError(this.errorHandler));
    }
 
    // Get user by user ID
    public getUserByUserId(userId: number): Observable<UserProjection> {
        return this.httpClient.get<UserProjection>(`${UserService.url}/${userId}`)
            .pipe(catchError(this.errorHandler));
    }
 
    public getUserByEmail(email: string): Observable<UserProjection> {
        return this.httpClient.get<UserProjection>(`${UserService.url}/email-domain/${email}`)
            .pipe(catchError(this.errorHandler));
    }
   
 
    // Get user by name
    public getUserByName(username: string): Observable<UserProjection> {
        return this.httpClient.get<UserProjection>(`${UserService.url}/search/${username}`)
            .pipe(catchError(this.errorHandler));
    }
 
    // Update user details
    public updateUserDetails(user: User): Observable<void> {
        return this.httpClient.put<void>(`${UserService.url}/update/${user.userId}`, user)
            .pipe(catchError(this.errorHandler));
    }
 
 
   // Delete user from the server
public deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${UserService.url}/delete/${userId}`)
      .pipe(catchError(this.errorHandler)); // Handles any errors that occur during the request
  }
 
 
    // Get users with completed tasks
    public getUsersWithCompletedTasks(): Observable<UserProjection[]> {
        return this.httpClient.get<UserProjection[]>(`${UserService.url}/completed-tasks`)
            .pipe(catchError(this.errorHandler));
    }
 
    // Authenticate user
    public authenticateUser(username: string, password: string): Observable<string> {
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);
 
        return this.httpClient.get<string>(`${UserService.url}/authenticate`, {
            params,
            responseType: 'text' as 'json'
        }).pipe(catchError(this.errorHandler));
    }
 
    // Get user with most tasks
    public getUsersWithMostTasks(): Observable<UserProjection> {
        return this.httpClient.get<UserProjection>(`${UserService.url}/most-tasks`)
            .pipe(catchError(this.errorHandler));
    }
}
 
 