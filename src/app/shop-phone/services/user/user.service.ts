import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  updateUser(data: any): Observable<any> {
    const url = `${urlApi}/users`;
    return this.apiService.put(url, data);
  }
  getUser(): Observable<any> {
    const url = `${urlApi}/users`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as UserModel;
      })
    )
  }
  getUserAll(): Observable<any> {
    const url = `${urlApi}/users/all`;
    return this.apiService.get(url).pipe(
      map((res: HttpResponse<any>) => {
        return res.body as UserModel[];
      })
    )
  }
}
