import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css']
})
export class CompanyHeaderComponent implements OnInit {
  sessionItem:any;
  company_id:any;
  user:string;
  constructor(private router: Router,public logout_obj: CommonService, public _route: Router) { }

  ngOnInit() {
    this.sessionItem = JSON.parse(localStorage.getItem('data')); 

    this.company_id = this.sessionItem.company;
    this.user = this.sessionItem.email;



    this.logout_obj.companySession();


  }
  logout(){
    this.logout_obj.logout();
    this._route.navigate(['login']);
   }

}
