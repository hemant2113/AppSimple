import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:Http) {
}
postData(){
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var in_data = [{'username': currentUser.username, 'password': currentUser.password}];
      return this.http.post("https://jsonplaceholder.typicode.com/posts",in_data);
  }
}
