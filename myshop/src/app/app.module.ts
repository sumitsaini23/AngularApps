import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent} from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { AuthService } from './auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { ProductFilterComponent } from './shared/product-filter/product-filter.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MyOrderComponent,
    CheckOutComponent,
    LoginComponent,
    ProductsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    ProductsFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      	{ 	path:'', component: HomeComponent },
      	{ 	path:'products', component: ProductsComponent },
      	{ 	path:'shopping-cart', component: ShoppingCartComponent },
      	{ 	path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      	{ 	path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      	{ 	path:'login', component: LoginComponent },
      	{ 	path:'my/orders', component: MyOrderComponent, canActivate: [AuthGuard]  },
      	{ 	path:'admin/products/add', component: ProductsFormComponent, canActivate: [AuthGuard,AdminAuthGuard]  },
      	{ 	path:'admin/products/edit/:id', component: ProductsFormComponent, canActivate: [AuthGuard,AdminAuthGuard]  },
     	  {	  path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard]  },
      	{ 	path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]  },
      //{ path:'', component: HomeComponent },
    ]),
    NgbModule
  ],
  providers: [
    HttpClient,
    AuthService,
    CategoryService,
    ProductService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
