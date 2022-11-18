import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/shop-phone/models/cart.model';
import { CartService } from 'src/app/shop-phone/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'quantity', 'totalPrice', 'action'];
  cart!: CartModel; 
  dataSource = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe(
      res => {
        this.cart = res;
        this.dataSource = this.cart.cartDetails;
      }, error => {
        console.log(error);
      }
    )
  }

  deleteDetail(id: number, quantity: number): void {
    this.cartService.deleteProductToCart(id, quantity).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Xóa thành công!',
          showConfirmButton: true,
        });
        this.getCart();
      }, error => {
        console.log(error);
        
        Swal.fire({
          icon: 'error',
          title: 'Thất bại!',
          showConfirmButton: true,
        })
      }
    )
  }
  addToCart(productId: number): void {
    const data = {
      productId: productId,
      quantity: 1
    }
    this.cartService.addProductToCart(data).subscribe(
      res => {
        this.getCart();
      }, error => {
        console.log(error);
        
      }
        
    );
  }

  removeTocart(cartDetailId: number, quantity: number){
    if(quantity === 1) {
      this.deleteDetail(cartDetailId, quantity);
    }else {
      this.cartService.removeCountCartDetail(cartDetailId).subscribe(
        res => {
          this.getCart();
        }, error =>{
          console.log(error);
        }
      )
    }
  }

}
