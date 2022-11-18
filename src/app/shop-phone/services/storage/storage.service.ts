import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private cookie: CookieService) { }

  getToken(): string{
    return this.cookie.get("token");
  }
  saveToken(token: string): void{
    this.cookie.set("token", token, {path: '/'});
  }
  getRole(): string{
    return this.cookie.get('role');
  }
  saveRole(role: string): void{
    this.cookie.set('role', role,  {path: '/'});
  }
  deleteAll(): void{
    this.cookie.deleteAll('/')
  }
}
