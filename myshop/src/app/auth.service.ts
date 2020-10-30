import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { AppError } from './shared/app.error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost/myshopapp/index.php/";
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }
  
  login(data: object){
    return this.http.post<any>(this.baseUrl+'login', JSON.stringify(data))
    .pipe(map(user => {
      if(user.status == true){
        localStorage.setItem('currentUser', JSON.stringify(user.data));
      }
    }),
    catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
  
  isAdminLoggedIn() {
    var udata = JSON.parse(localStorage.getItem('currentUser'));
    if (udata && udata[0]['isAdmin'] == '1') {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.clear();
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
