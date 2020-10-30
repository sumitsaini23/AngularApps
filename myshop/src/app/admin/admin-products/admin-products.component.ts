import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  	selector: 'app-admin-products',
  	templateUrl: './admin-products.component.html',
  	styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
	products: Product[];
	filterProducts: any;
	subscription:Subscription;
	error;
  	productslist;
  	constructor(private productService: ProductService) { }

  	ngOnInit(): void {
    	this.subscription = this.productService.getAllproducts().subscribe((res: any) => 
		{
			if(res.status == true && res.data.length > 0){
				this.filterProducts = this.products = res.data;
			}
		});
  	}
	
	//-------------delete product----------
	onDelete(id: number){
		Swal.fire({
			title: "Are you sure?",
			text:"Once deleted, you will not be able to recover",
			icon: "warning",
			showCancelButton: true,
      		confirmButtonText: 'Yes, delete it!',
      		cancelButtonText: 'No, keep it'
		}).then((willdelete) => {
			if(willdelete.value){
				this.productService.deleteproduct(+id).subscribe((res:any) => {
						if(res.status == true){
							Swal.fire({
								title: "Deleted!",
								text: res.message,
								icon: "success",
							});
							this.ngOnInit();	
						}else{
							Swal.fire({
								title: "Somthing wrong",
								text: res.message,
								icon: "error",
							});
						}
				  	},
				  	error => this.error = error)
					
			}else if(willdelete.dismiss === Swal.DismissReason.cancel){
				Swal.fire(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				)
			}
		})
	}
	//-----------Search ------------
	filter(query: string){
		this.filterProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))  :
		this.products;
		//console.warn(this.filterProducts);
	}
}
