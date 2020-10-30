import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
	private baseUrl = "http://localhost/myshopapp/index.php/";
	constructor(private http:HttpClient) { }
	
	//--------------get All Categories-----------
	get_categories(){
		return this.http.get(this.baseUrl+'categorylist').pipe();
	}
}
