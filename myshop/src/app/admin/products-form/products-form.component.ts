import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
	error: string;
	uploadError: string;
	pageTitle: string;
	// title: string;
	// price: string;
	// categoryid: number;
	// imageUrl: string;
	categories;
	product;
  constructor(
		private category: CategoryService, 
		private productService: ProductService, 
		private route:ActivatedRoute,
		private router: Router) { }

  	ngOnInit(): void {
		let pid = this.route.snapshot.paramMap.get('id');
		if(pid) this.productService.getproduct(pid).subscribe(p => this.product = p);
		
		this.category.get_categories().subscribe(list => 
			{
				this.categories = list;
			}
		);
	}
	  
	saveProduct(formdata){
		var obj = {
			title: formdata.title,
			price: formdata.price,
			categoryid: formdata.categoryid,
			imageUrl: formdata.imageUrl
		}
		const id = formdata.id;
		
		if(id){
			this.productService.update_products(obj, id).subscribe(
			res =>{
				//formdata.reset();
				console.log(res);
				Swal.fire({
					title: "Good job!",
					text: res.message,
					icon: "success",
				});
				this.router.navigate(['/admin/products']);
			})
		}else{
			this.productService.add_products(obj).subscribe(
			res =>{
				//formdata.reset();
				console.log(res);
				Swal.fire({
					title: "Good job!",
					text: res.message,
					icon: "success",
				});
				this.router.navigate(['/admin/products']);
			})
		}
	}

}
