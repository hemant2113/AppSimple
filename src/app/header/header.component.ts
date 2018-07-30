import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sessionItem:any;
  user = '';
  constructor(public common: CommonService, public _route: Router) { }

  ngOnInit() {
    this.common.adminSession();


    this.sessionItem = JSON.parse(localStorage.getItem('data'));

    console.log(this.sessionItem)
    this.user = this.sessionItem.email;
  }

  logout(){
   this.common.logout();
   this._route.navigate(['login']);
  }




}
