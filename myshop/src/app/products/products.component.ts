import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
	products: Product[] = [];
	filterProducts: any[];
	subscription:Subscription;
	category:string;
	error;
  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  	ngOnInit(): void {
    	this.subscription = this.productService.getAllproducts().subscribe((res: any) => 
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
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}
