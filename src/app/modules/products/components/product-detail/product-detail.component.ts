import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { CartService } from 'src/app/shop-phone/services/cart/cart.service';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="bi bi-caret-left-fill"></i>', '<i class="bi bi-caret-right-fill"></i>'],
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
  productId!: string;
  product!: ProductModel;
  constructor(private router: ActivatedRoute, private productService: ProductService, private cartSerivce: CartService) { }

  ngOnInit(): void {
    this.productId = this.router.snapshot.params['productId'];
    this.loadData();
  }
  loadData(): void{
    this.productService.getProductByID(parseInt(this.productId)).subscribe(
      res => {
        this.product = res;
      },error => {
        console.log(error);
      }
    )
  }

  addToCart(): void {
    const data = {
      productId: parseInt(this.productId),
      quantity: 1
    }
    this.cartSerivce.addProductToCart(data).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Bạn chưa đăng nhập',
          showConfirmButton: true,
        }),
        console.log(error);
      }
    )
  }

}
