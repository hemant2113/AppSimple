import { apiPath } from './../share/apipath';
import { CommonService } from './../services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Http , Response } from  '@angular/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  columns = [{colId: 'col1', name:'', url:'' }];












  model: any = {};   //login 2 form 
  hobbies:string[];
  auth_token:string =  "";
  api = apiPath.apiUrl;
  key : any = "";
  item : any = "";
  sessionItem:any;

constructor(public common: CommonService,private notif: NotificationsService,private _router:Router , private user:UserService,private http: Http) {
   }

  ngOnInit() {
    const domain_name = window.location.hostname;
    this.http.post(this.api + 'company/detail', {
        domain_name: domain_name
    }, '{headers: headers}').subscribe(res => {
      if (res.json().data.responseCode == 200) {
        document.getElementById("login_div").style.display = "none";
      }  
    });


    this.sessionItem = JSON.parse(localStorage.getItem('data')); 
    if((this.sessionItem)){
      if(this.sessionItem.role){
        if((this.sessionItem.role == 1)){
          this._router.navigate(['/overview']);
        }
        if((this.sessionItem != '' || this.sessionItem != null) && (this.sessionItem.role == 3)){
          this._router.navigate(['/company-dashboard',this.sessionItem.company]);
        }
      }
    }
  }
  onSubmit(){
   
    var email = this.model.email;
    var password = this.model.password;

    // console.log(email,password)
   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    this.http.post(this.api+"login", {
    email: email,
    username: 'xyz',
    password: password
    }, '{headers:headers}').subscribe((res: Response) =>{
    
    console.log(res.json().data.responseCode,res.json().data.result);
                if (res.json().data.responseCode == 200) {

                  let key = 'data';
                  localStorage.setItem(key, JSON.stringify(res.json().data.result));
                  this.common.successNotify('Success','Login Successfully')

                  console.log(res.json().data.result.role)
                  if (res.json().data.result.role == 1) {
                     this._router.navigate(['/overview']);
                  } else if (res.json().data.result.role == 2) {
                    alert("you are logged in as sub admin Its in under development")
                    
                  } else if (res.json().data.result.role == 3) {
                    //  alert(res.json().data.result.company); 
                   const search_id = res.json().data.result.company;
                    this._router.navigate(['/company-dashboard',search_id]);
                      // alert("you are logged in as company admin Its in under development")
                    
                  } else if (res.json().data.result.role == 4) {
                      alert("you are logged in as Company sub admin Its in under development")
                      
                  }else{
                    alert('unauthorised user')
                  }
                     
                } else {
                  this.common.errorNotify('Error',res.json().data.error)
                  
                }

          });
          


      }









 
 

}



