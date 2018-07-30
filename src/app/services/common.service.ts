import { Injectable } from '@angular/core';
import {
  Router
} from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';



var sessionItem = JSON.parse(localStorage.getItem('data')); 
var Token = '';
if(sessionItem && sessionItem.token){
  Token = 'Token '+sessionItem.token 
}

export const HeaderData = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': Token
  })
};


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router,private notif: NotificationsService) { 
    

  }
  logout(){
    localStorage.clear();
    this.notif.success(
      'Success',
      'Logout successfully',
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 50,
        // position: ["top", "top"]
      }
      
    )
  }
  sessionItem:any;
  companySession(){
    this.sessionItem = JSON.parse(localStorage.getItem('data')); 
    if(this.sessionItem == '' || this.sessionItem ==  null){ 
      // return 'False';
      this.router.navigate(['login']); 
    } 
    else if(this.sessionItem.role != 3){ 
      this.router.navigate(['login']); 
    }
  }
  adminSession(){
    this.sessionItem = JSON.parse(localStorage.getItem('data')); 
    if(this.sessionItem == '' || this.sessionItem ==  null){ 
      // return 'False';
      this.router.navigate(['login']); 
    } 
    else if(this.sessionItem.role != 1){ 
      this.router.navigate(['login']); 
    }
  }
  successNotify(title, message, navigate=null){
    this.notif.success(
      title,
      message,
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 50,
        // position: ["top", "top"]
      }
    )
    if(navigate){
      this.router.navigate([navigate]);
    }  
  }
  errorNotify(title, message, navigate=null){
    this.notif.error(
      title,
      message,
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 50,
        // position: ["top", "top"]
      }
    ) 
    if(navigate){
      this.router.navigate([navigate]);
    }  

  }

  loadBodyScript(data, tag) {
    let node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.id="hs-script-loader"
    // node.src = "https://js.hs-scripts.com/"+data+".js";
    node.src = "https://js.hs-scripts.com/362063.js";
    document.getElementsByTagName(tag)[0].appendChild(node);
  }
  loadScript(data, tag) {
    let node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.id="hs-script-loader"
    node.src = data;
    document.getElementsByTagName(tag)[0].appendChild(node);
  }

}
