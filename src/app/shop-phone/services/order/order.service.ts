import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../../models/order.model';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  getOrder(): Observable<any> {
    const url = `${urlApi}/orders`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as OrderModel[]
      })
    )
  }

  createOrder(order: any) : Observable<any> {
    const url = `${urlApi}/orders`;
    return this.apiService.post(url, order);
  }

  updateStatusOrder(data: any) : Observable<any> {
    const url = `${urlApi}/orders`;
    return this.apiService.put(url, data);
  } 

  getOrderByUser(): Observable<any> {
    const url = `${urlApi}/orders/user`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as OrderModel[]
      })
    )
  }

  getOrderById(id: number) : Observable<any> {
    const url = `${urlApi}/orders/detail/${id}`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    )
  }

}
