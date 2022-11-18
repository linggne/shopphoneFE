import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { ProductModel } from 'src/app/shop-phone/models/product.model';
import { UserModel } from 'src/app/shop-phone/models/user.model';
import { CartService } from 'src/app/shop-phone/services/cart/cart.service';
import { ProductService } from 'src/app/shop-phone/services/product/product.service';
import { StorageService } from 'src/app/shop-phone/services/storage/storage.service';
import { UserService } from 'src/app/shop-phone/services/user/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  price = 0;
  quantityCart: number = 0;
  isLogin!: boolean;
  user!: UserModel;
  myControl = new FormControl('');
  options: ProductModel[] = [];
  filteredOptions!: Observable<ProductModel[]>;

  constructor(private storageService: StorageService,
              private router: Router,
              private cartService: CartService,
              private userService: UserService,
              private productService: ProductService) { }

  ngOnInit(): void {
    if(this.storageService.getToken()){
      this.isLogin = true;
    }
    this.loadUser();
    this.cartService.getCart().subscribe();
    this.listenState();
    this.loadProduct();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(product: ProductModel): string {
    return product && product.name ? product.name : '';
  }
  private _filter(name: string): ProductModel[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  logout(){
    this.storageService.deleteAll();
    window.location.href = '/';
  }
  loadUser(): void {
    this.userService.getUser().subscribe(
      res => {
        this.user = res;
      }, error => {
        console.log(error);
      }
    )
  }
  listenState(): void{
    this.cartService.cart$.subscribe(res => this.cartChange());
  }
  cartChange(): void{
    const cart = this.cartService.getCartUser();
    if (cart){
      this.quantityCart = cart.count;
    }
  }
  loadProduct() {
    this.productService.getProducts().subscribe(
      res => {
        this.options = res;
      },error => {
        console.log(error);
      }

    )
  }
  searchProduct() {
   const array = this.options.filter(item => item.name.includes(this.myControl.value));
   this.router.navigate(
    ['/products/shop'],
    { queryParams: { id: array[0].id, brandId: array[0].brand.id, type: array[0].type } }
  );
  }
}
