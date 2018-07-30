import { apiPath } from './share/apipath';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserListService {
  api = apiPath.apiUrl;
  constructor(private http: Http) { 
    console.log('service connect (user manage com. + user list Ser.) ');
  }

  getUserList(id){
    
    // return this.http.get("http://18.218.9.135:8888/user");    // server
   return this.http.get(this.api+"user/company/"+id);  //local-server
   }
   deleteList(id){
    console.log(id)
    // return this.http.get("http://18.218.9.135:8888/user");    // server
   return this.http.delete(this.api+"user/"+id);  //local-server
   }
}
