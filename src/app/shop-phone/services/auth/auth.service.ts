import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../../models/auth.model';
import { StorageService } from '../storage/storage.service';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService,
              private storageService: StorageService) { }

  login(dataLogin: any): Observable<any>{
    const url = `${urlApi}/auth/signin`;
    return this.apiService.post(url,dataLogin).pipe(
      map((res: HttpResponse<any>) => {
        const auth = res.body as AuthModel;
        this.storageService.saveToken(auth.token);
        this.storageService.saveRole(auth.role);
        return auth;
      })
    )
  }

  register(data: any): Observable<any> {
    const url = `${urlApi}/auth/signup`;
    return this.apiService.post(url,data);
  }

}
