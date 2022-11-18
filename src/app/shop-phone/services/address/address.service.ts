import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'cluster';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressModel } from '../../models/address.model';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apiService: ApiService) { }

  getAddress(): Observable<any>{
    const url = `${urlApi}/address`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as AddressModel;
      })
    )
  }

  createAddress(address: any): Observable<any> {
    const url = `${urlApi}/address`;
    return this.apiService.post(url, address);
  }
}
