import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apiService: ApiService) { }

  postContact(data: any): Observable<any> {
    const url = `${urlApi}/contact`;
    return this.apiService.post(url, data);
  }

  getContact(): Observable<any> {
    const url = `${urlApi}/contact`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    )
  }
}
