import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) {}

  upload(form: any, url: string){

    const formData = new FormData();

    

    const requesT = new HttpRequest('POST', url, formData)

    return this.http.request(requesT)
  }
}
