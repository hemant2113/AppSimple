import { apiPath } from './../../share/apipath';
import { Response } from '@angular/http';
import { HeaderData } from './../../services/common.service';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

// import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  api = apiPath.apiUrl;
  password:any;
  old_password:any;
  conf_password:any;
  msg:string;
  email:string;
  sessionItem:any;
  Token:any;
  flash:any;
  company_id:any;
  model: any = {};
  data:any;
  not_exist_password:string;
  exist_password:string;
  msg_match:string;
  msg_not_match:string;
  constructor(private http: HttpClient,private notif: NotificationsService,public router: Router,public logout_obj: CommonService) { }

    ngOnInit() {
      this.sessionItem = JSON.parse(localStorage.getItem('data')); 
      this.email = this.sessionItem.email;
      this.company_id = this.sessionItem.company;
    }
    onKeyup(){
     console.log(this.model.password == this.model.conf_password)
      if (this.model.password == this.model.conf_password) {
         this.msg_match = 'Password Matched';
         this.msg_not_match = '';
      } else {
         this.msg_match = '';
         this.msg_not_match = 'Password Not Matched';
      }
    }
    
    onSubmit() {
    
    let formData = { old_password: this.old_password ,new_password: this.model.password , confirm_new_password: this.model.conf_password }

    this.http.post(this.api+'changepassword', formData , HeaderData ).subscribe((res) =>{
      if(res['data']['responseCode'] == 200 ){
        this.logout_obj.successNotify('Success', 'Password changed successfully','dashboard');
        // this.router.navigate(['dashboard'])
      }else{
        this.notif.error(
          'Error',
          res['data']['error'],
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
    });

    }



    onCheckPassword(){
      this.http.post(this.api+'currentpassword',{ password: this.old_password } , HeaderData ).subscribe((res) =>{
        
        if(res['data']['result'] == false ){
          this.exist_password = ' ';
          this.not_exist_password = 'Password Not Matched';
        }else{
          this.not_exist_password = ' ';
          this.exist_password = 'Password Matched';
        }
    });
  }

}
