import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../_core/api.service';

const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private apiService: ApiService,
  ) { }

  uploadImage(image: File, body: any): Observable<any> {
    const path = `${urlApi}/images`;
    const formData: FormData = new FormData();

    formData.append('file', image, image.name);
    formData.append('productId', body.productId ? body.productId : '');
    formData.append('type', body.type ? body.type : '');
    console.log(formData.has('file'));
    return this.apiService.postUrlEncoded(path, formData).pipe(
      map((res: HttpResponse<any>) => console.log(res)),
    );
  }

  deleteImage(id: number):Observable<any> {
    const url = `${urlApi}/images/${id}`
    return this.apiService.delete(url);
  }

  deleteImageByProductId(id: number):Observable<any> {
    const url = `${urlApi}/images/product/${id}`
    return this.apiService.delete(url);
  }
}
