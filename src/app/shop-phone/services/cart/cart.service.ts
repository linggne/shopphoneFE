import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../../models/cart.model';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<any>({});
  public cart$ = this.cart.asObservable();

  constructor(private apiService: ApiService) { }

  createCart(): Observable<any> {
    const url = `${urlApi}/cart`;
    return this.apiService.post(url,null);
  }

  getCart(): Observable<any> {
    const url = `${urlApi}/cart/user`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        
        if(res.body?.countProduct){
          console.log("ddssd");
          
          const data = {
            count: res.body.countProduct
          }
          this.cart.next(data)
        }else{
          this.cart.next({count: 0});
        }
        return res.body as CartModel;
      })
    )
  }

  deleteCart(cartId: number): Observable<any> {
    const url = `${urlApi}/cart/${cartId}`;
    const data = {
      count: 0
    }
    this.cart.next(data);
    return this.apiService.delete(url);
  }

  addProductToCart(data: any): Observable<any> {
    const url = `${urlApi}/cart/detail`;
    const res = {
      count: this.cart.getValue().count + data.quantity
    }
    this.cart.next(res);
    return this.apiService.post(url, data);
  }

  deleteProductToCart(cartDetailId: number, quantity: number): Observable<any> {
    const url = `${urlApi}/cart/detail/${cartDetailId}`;
    const res = {
      count: this.cart.getValue().count - quantity,
    }
    this.cart.next(res);
    return this.apiService.delete(url);
  }
  getCartUser(): any {
    console.log(this.cart.getValue().count);
    
    return this.cart.getValue();
  }

  removeCountCartDetail(cartDetailId: number) : Observable<any> {
    const url = `${urlApi}/cart/detail/${cartDetailId}`;
    const res = {
      count: this.cart.getValue().count - 1,
    }
    this.cart.next(res);
    return this.apiService.put(url);
  }
}
