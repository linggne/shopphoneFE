import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

   
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  listProduct: ProductModel[] = [];
  listPhoneOutstanding: ProductModel[] = [];
  listProductAccessory: ProductModel[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void{
    this.productService.getProducts().subscribe(
      res => {
        console.log(res);
        this.listProduct = res;
         this.getListPhone();
          this.getListAccessory();
      }
    )
  }
  getListPhone(): void {
    for(let i = 0 ; i< 6;i++){
      this.listPhoneOutstanding.push(this.listProduct[i]);
    }
  }
  getListAccessory(): void {
    this.listProductAccessory = this.listProduct.filter(item => item.type === 'accessory');
  }

}
