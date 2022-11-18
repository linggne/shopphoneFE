import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BrandModel } from '../../models/brand.model';
import { ProductModel } from '../../models/product.model';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getBrands(): Observable<any>{
    const url = `${urlApi}/brands`;
    return this.apiService.get(url)
      .pipe(
        map((res: HttpResponse<any>) => {
          return (res.body as BrandModel[]);
        })
      )
  }

  getProducts(params?: any): Observable<any> {
    const url = `${urlApi}/products`;
    return this.apiService.get(url, null,params)
      .pipe(
        map((res: HttpResponse<any>) => {
          const body = res.body;
          return (body as ProductModel[])
        })
      )
  }
  getProductByID(id: number): Observable<any> {
    const url = `${urlApi}/products/${id}`;
    return this.apiService.get(url)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body as ProductModel
        })
      )
  }
  postProduct(product: any): Observable<any>{
    const url = `${urlApi}/products`;
    return this.apiService.post(url, product).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as ProductModel;
      })
    )
  }
  deleteProduct(id: number): Observable<any> {
    const url = `${urlApi}/products/${id}`;
    return this.apiService.delete(url);
  }
  updateProduct(id: number, product: any): Observable<any>{
    const url = `${urlApi}/products/${id}`;
    return this.apiService.put(url, product);
  }
}
