import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { CartService } from 'src/app/shop-phone/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

  @Input('product') product!: ProductModel;
  constructor(private cartSerivce: CartService) { }

  ngOnInit(): void {
     
  }
  getUrl(id: number): void{
    window.location.href =  `products/detail/${id}`;
  }
  addToCart(productId: number): void {
    const data = {
      productId: productId,
      quantity: 1
    }
    this.cartSerivce.addProductToCart(data).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Đã thêm vào giỏ hàng!',
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
    );
  }

}
