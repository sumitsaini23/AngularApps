import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
	private baseUrl = "http://localhost/myshopapp/index.php/";

	constructor(private http:HttpClient) { }

	//--------------get All Categories-----------
	getAllproducts(){
		return this.http.get(this.baseUrl+'products').pipe(
			catchError(this.handleError)
		);
	}

	getproduct(productId){
		return this.http.get(this.baseUrl+'products/'+ productId).pipe(take(1),
			catchError(this.handleError)
		);
	}

	add_products(data){
		return this.http.post<any>(this.baseUrl+'products/add', data).pipe(
			catchError(this.handleError)
		);
	}

	update_products(data, id: number){
		return this.http.post<any>(this.baseUrl+'products/edit/' +id, data).pipe(
			catchError(this.handleError)
		);
	}

	deleteproduct(productId:number){
		return this.http.get(this.baseUrl+'products/delete/'+ productId).pipe(
			catchError(this.handleError)
		);
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
	
		return throwError('Something bad happened. Please try again later.');
	}
}
