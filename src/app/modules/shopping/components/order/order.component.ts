import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { BehaviorSubject } from 'rxjs';
import { CartDetailModel } from 'src/app/shop-phone/models/cart-detail.model';
import { AddressService } from 'src/app/shop-phone/services/address/address.service';
import { CartService } from 'src/app/shop-phone/services/cart/cart.service';
import { OrderService } from 'src/app/shop-phone/services/order/order.service';
import { UserService } from 'src/app/shop-phone/services/user/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  states = null;
  cities= null;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  note = new FormControl('');
  state = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  productDetail: CartDetailModel[] = [];
  totalPrice = new BehaviorSubject<number>(0);
  stateOwl!: any;
  cityOwl!: any;

  formOrder = this._formBuilder.group({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    address: this.address,
    note: this.note,
    state: this.state,
    city: this.city
  });
  constructor(private _formBuilder: FormBuilder, 
    private cartService: CartService, 
    private orderService: OrderService, 
    private userService: UserService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    this.loadState();
    this.loadProductDetail();
    this.loadAddress();
    this.loadUser();
  }

  loadState(): void {
    this.states = State.getStatesOfCountry(
      "VN"
    );
  }
  onStateChange(value: any): void {
    this.cities = City.getCitiesOfState(
      "VN",
      value.isoCode
    );  
  }
  loadAddress() {
    this.addressService.getAddress().subscribe(
      res => {
        this.formOrder.controls['state'].setValue(State.getStateByCodeAndCountry(res.code, "VN"));
        this.stateOwl = State.getStateByCodeAndCountry(res.code, "VN");
        this.cities = City.getCitiesOfState(
          "VN",
          this.stateOwl.isoCode
        );  
        this.formOrder.controls['city'].setValue(res.city);
        this.formOrder.controls['address'].setValue(res.detail);
        this.cityOwl = res.city;
      }, error => {
        console.log(error);
      }
    ) 
  }
  loadUser(): void {
    this.userService.getUser().subscribe(
      res => {
        this.formOrder.controls['firstName'].setValue(res.firstName);
        this.formOrder.controls['lastName'].setValue(res.lastName);
        this.formOrder.controls['phone'].setValue(res.phone);
        this.formOrder.controls['email'].setValue(res.email);
      }, error => {
        console.log(error);
      }
    )
  }
  loadProductDetail(): void {
    this.cartService.getCart().subscribe(
      res => {
        this.productDetail = res.cartDetails;
        this.totalPrice.next(res.totalPrice);
        if(this.productDetail.length === 0 ){
          window.location.href = '/'
        }
      },
      error => {
        console.log(error);
      } 
    )
  }

  onSubmit(): void {
    const code = this.formOrder.value.state.isoCode;
    const state = this.formOrder.value.state.name;
    
    const user = {
      firstName: this.formOrder.value.firstName,
      lastName: this.formOrder.value.lastName,
      phone: this.formOrder.value.phone,
      email: this.formOrder.value.email
    }
    this.userService.updateUser(user).subscribe(
      res => {

      }, error => {
        console.log(error);
        
      }
    );
    const address = {
      state: state,
      city: this.formOrder.value.city,
      detail: this.formOrder.value.address,
      code: code
    }
    if(this.stateOwl.isoCode !== this.formOrder.value.state.isoCode || this.cityOwl !== this.formOrder.value.city){
      this.addressService.createAddress(address).subscribe();
    }
    const order = {
      note: this.formOrder.value.note,
      typePayment: 'cash',
      totalPrice: this.totalPrice.getValue()
    }
    setTimeout(() => {
      this.orderService.createOrder(order).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Đơn hàng đã tạo thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            showConfirmButton: true,
          }),
          console.log(error);
        }
      )
    }, 300)
  }
}
