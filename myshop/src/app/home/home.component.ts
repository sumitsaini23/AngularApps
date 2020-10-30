import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  	selector: 'app-home',
  	templateUrl: './home.component.html',
  	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	products: Product[] = [];
	filterProducts: Product[]= [];
	category: string;
  	constructor(
		private productService: ProductService, 
		private route: ActivatedRoute) { }

  	ngOnInit(): void {
		
		this.productService.getAllproducts().subscribe((res: any) => 
		{
			if(res.status == true && res.data.length > 0){
				this.filterProducts = this.products = res.data;
			}
		});

		this.route.queryParamMap.subscribe(params => {
			this.category = params.get('category');
			this.filterProducts = (this.category) ? 
			this.products.filter(p => p.category == this.category) : this.products;
		})
  	}
}
