import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ShopProductsComponent } from './components/shop-products/shop-products.component';
import { ProductsComponent } from './products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WelcomeModule } from '../welcome/welcome.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    ShopProductsComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CarouselModule,
    WelcomeModule,
    MatButtonModule,
    MatListModule
  ]
})
export class ProductsModule { }
