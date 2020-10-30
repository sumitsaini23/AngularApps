import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
	href:string;
  	categories: any= [];
	@Input('category') category;

	constructor(
		private categoryService: CategoryService, 
		private router: Router
	) { }

  	ngOnInit(): void {
		this.href = this.router.url.substring(0, this.router.url.indexOf('?'));
		console.log(this.href);
		this.categoryService.get_categories().subscribe((list:any) => 
			{
				this.categories = list;
			}
		);
  	}

}
