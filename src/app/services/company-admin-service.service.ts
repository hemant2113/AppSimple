import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminServiceService {
  constructor(private _router:Router) {
    // let item = JSON.parse(localStorage.getItem('data'));
    // alert(this.api+'login');
    // if(!item){
    // this._router.navigate([this.api+'login']);  
    // } 
    // if(item.role != 3){
    //   this._router.navigate([this.api+'login']);  
    // } 

   }
}
