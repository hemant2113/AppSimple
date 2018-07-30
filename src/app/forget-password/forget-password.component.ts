import { apiPath } from './../share/apipath';
import { Component, OnInit } from '@angular/core';
import { Http , Response } from  '@angular/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  model: any = {};
  api = apiPath.apiUrl;

  constructor(private http: Http,private _router:Router) { }

  ngOnInit() {
  }


  onSubmit(){
    var email = this.model.email;
   console.log(email)
   

   var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
   
   
    this.http.post(this.api+"forgotpassword", {email: email}  , '{headers:headers}').subscribe((res)=>{
      console.log(res.json().data.responseCode)
      if (res.json().data.responseCode == 200){
        alert(res.json().data.result);
        this._router.navigate(['login']);
      }else{
        alert(res.json().data.result);
      }
    });
    



  }
}
