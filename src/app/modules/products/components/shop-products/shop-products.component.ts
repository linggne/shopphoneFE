import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css']
})
export class ShopProductsComponent implements OnInit {

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
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  listProduct = new BehaviorSubject<ProductModel[]>([])
  constructor(private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParams
      .subscribe(params => {
        if(params['id']){
          this.productService.getProducts(params).subscribe(
            res => {
              this.listProduct.next(res);
              
              const product = this.listProduct.getValue().filter(item => item.id === parseInt(params['id']));
              this.listProduct.next(this.listProduct.getValue().filter(item => (item.brand.id === parseInt(params['brandId'])) && item.type === params['type']));
              
              this.listProduct.next(this.listProduct.getValue().filter(item => item.id !== parseInt(params['id'])));
              this.listProduct.getValue().unshift(product[0]);
            }, error => {
              console.log(error);
            }
          )
        }
      }
    );
  }
  loadProducts(params?: any): void{
    this.productService.getProducts(params).subscribe(
      res => {
        this.listProduct.next(res);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Sản phẩm của hãng chưa có',
          showConfirmButton: true,
        })
      }
    )
  }
  loadProductByBrand(brandId: number){
    this.loadProducts({brandId});
  }
  loadProductByStatus(status: string){
    this.loadProducts({status});
  }
  loadProductByType(type: string) {
    this.loadProducts({type});
  }

}
