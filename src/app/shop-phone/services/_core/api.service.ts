import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
    private storageService: StorageService) { }

    public setHeaders(headers?: any): HttpHeaders {
      const token = 'Bearer ' + this.storageService.getToken();
      let httpHeaders;
      if (token){
        try{
          // @ts-ignore
          httpHeaders = new HttpHeaders(_.assign({
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token
          }, headers));
        }catch (error) {
          console.log(error);
          
        }
      }
      // @ts-ignore
      return httpHeaders;
    }
    public setUrlEncodedHeaders(headers?: any): HttpHeaders {
      const token = 'Bearer ' + this.storageService.getToken();
      let httpHeaders;
      if (token){
        try{
          // @ts-ignore
          httpHeaders = new HttpHeaders(_.assign({
            Authorization: token
          }, headers));
        }catch (error) {
          // todo
        }
      }
      // @ts-ignore
      return httpHeaders;
    }
    // tslint:disable-next-line:typedef
    private errorHandler(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error occurred.
        console.error('An error occurred: ', error.error.message);
      } else {
        return throwError(error);
      }
      return throwError('Something went wrong!');
    }
  
    // @ts-ignore
    public get(path: string, options?, params?: HttpParams): Observable<any> {
      return this.httpClient.get(
        path,
        {
          headers: this.setHeaders(options),
          params,
          withCredentials: false,
          observe: 'response'
        })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
    public post(path: string, body: any, customHeader?: any): Observable<HttpResponse<any>> {
      return this.httpClient.post<any>(
        path, body,
        {
          headers: this.setHeaders(customHeader),
          withCredentials: false,
          observe: 'response'
        })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
  
    public postUrlEncoded(path: string, body: any, customHeader?: any): Observable<HttpResponse<any>> {
      return this.httpClient.post<any>(
        path, body,
        {
          headers: this.setUrlEncodedHeaders(customHeader),
          withCredentials: false,
          observe: 'response'
        })
        .pipe(
          catchError(this.errorHandler)
        );
    }
    public put(path: string, body?: any): Observable<any> {
      return this.httpClient.put(
        path, body,
        {
          headers: this.setHeaders(),
          withCredentials: false,
          observe: 'response'
        })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
  
    public delete(path: string): Observable<any> {
      return this.httpClient.delete(
        path,
        {
          headers: this.setHeaders(),
          withCredentials: false,
          observe: 'response'
        })
        .pipe(
          catchError(this.errorHandler)
        );
    }
}
