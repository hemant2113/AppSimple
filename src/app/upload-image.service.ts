import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
company_name:string = "hemant";
company_url:string = "Bhagat";
  constructor(private http : HttpClient) { 
    console.log('upload image connected')
  }
  postFile(fileToUpload: File) {
    alert('hhh')
    const endpoint = "http://192.168.0.105:4242/company";
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    console.log(formData);
    return this.http
      .post(endpoint,{"name": "Hemant*****",
      "url": "Url*****",
    "logo": formData });
  }
}
