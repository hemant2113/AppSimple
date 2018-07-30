import { apiPath } from './../../share/apipath';
import { CommonService } from './../../services/common.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
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
  constructor(public common: CommonService,private http: HttpClient,private notif: NotificationsService,public router: Router) { }

  ngOnInit() {
    this.sessionItem = JSON.parse(localStorage.getItem('data')); 
  this.email = this.sessionItem.email;
  this.company_id = this.sessionItem.company;
    }

    onKeyup(){
     
      if (this.model.password == this.model.conf_password) {
        console.log('yes')
         this.msg_match = 'Password Matched';
         this.msg_not_match = '';
      } else {
       
         this.msg_match = '';
         this.msg_not_match = 'Password Not Matched';
      }
    }
    
    onSubmit() {
      this.sessionItem = JSON.parse(localStorage.getItem('data')); 
      
      this.Token = 'Token '+this.sessionItem.token 
      
      
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    let formData = { old_password: this.old_password ,new_password: this.model.password , confirm_new_password: this.model.conf_password }

    httpOptions.headers = httpOptions.headers.set('Authorization', this.Token);

    // this.http.post(this.api+'changepassword', formData, httpOptions).subscribe((res: Response)=>{
    //   console.log('res==>', res)
      
    // if (res.json().data.responseCode == 200) {
    //     alert('Company added !!') 
    //     window.location.reload();
    //  } else {
    //    alert(res.json().data.error)  
    //  }
    // });  



    this.http.post(this.api+'changepassword', formData , httpOptions ).subscribe((res: Response) =>{
      if(res['data']['responseCode'] == 200 ){
       this.common.successNotify('Success','Succesfully Password Changed')
        this.router.navigate(['company-dashboard' , this.company_id])
      }else{
        this.common.errorNotify('Erorr',res['data']['result'])
      }
    });

    }




    onCheckPassword(){
      this.sessionItem = JSON.parse(localStorage.getItem('data')); 
      this.Token = 'Token '+this.sessionItem.token 
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
       
      httpOptions.headers = httpOptions.headers.set('Authorization', this.Token);

      
      this.http.post(this.api+'currentpassword',{ password: this.old_password } , httpOptions ).subscribe((res: Response) =>{
        
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
