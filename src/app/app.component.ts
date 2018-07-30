import { apiPath } from './share/apipath';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Jsonp } from '@angular/http';
import { Title } from '@angular/platform-browser';
// import {FlashMessage} from 'angular-flash-message';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  favicon: boolean = false;
  title = 'app';
  api = apiPath.apiUrl;
  data:any;
  newdata:any;
  company=[];
  compnay_url_array=[];

constructor(public dataservice: DataService,public _route: Router,  private loc: Location,   public _http: Http){

}
  ngOnInit(){
    // Right Click Off
    // document.addEventListener('contextmenu', event => event.preventDefault());
    // Right Click Off
    // this.titleService.setTitle('instaspiel---');

  //   var path = window.location.href;
    
  //   this.dataservice.getData().subscribe(posts => {
  //     alert(path)    
  //     this.company = posts.json().data.result;
  //     console.log(this.company)
  //     this.company.forEach(element =>{
  //       if(path == 'http://'+element.url+'/login' && path == 'http://'+element.url+'/dashboard'){
  //        this.route.navigate(['error']) 
  //       }
  //     });
  // });

 



    const domain_name = window.location.hostname;
    this.newdata = '';
     this.favicon = false;
    this._http.post(this.api+'company/detail', {domain_name: domain_name},'{headers: headers}').subscribe(res =>{
      this.data = res;
      if(res.json().data.responseCode == 200){
        this.newdata = res.json().data.result
      }else{
        // this._route.navigate(['login'])
      }

    });
    
    
  }




}
interface Post{
  name:string,
  title:string
}
