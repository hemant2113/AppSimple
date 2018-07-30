import { apiPath } from './../share/apipath';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
posts:Post[];
api = apiPath.apiUrl;
  constructor(private http:Http) {
    // this.getJSON().subscribe(data => {
    //
    //     var len=data.json().length;
    //        console.log(len);
    //        for(let i=1;i<=len;i++){
    //        console.log(data.json()[i]);
    //        this.posts = data.json()[i];
          //  return
    //        }
    //    });

}
 getData(){
       return this.http.get(this.api+"company");
   }

}
interface Post{
  userId:number
}
