import { Injectable } from "@angular/core";
import { HttpClient, HttpParams , HttpErrorResponse} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserLoginProjection } from "../models/userloginprojection.model";


@Injectable({
  providedIn: "root",
})
export class LoginService {
  private loginUrl = "http://localhost:8091/api/users/login/authenticate";

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<UserLoginProjection[]> {
    const params = new HttpParams()
      .set("username", credentials.username)
      .set("password", credentials.password);

    return this.http.get<UserLoginProjection[]>(this.loginUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Make sure errors are passed back to the component
      })
    );
  }
  }

