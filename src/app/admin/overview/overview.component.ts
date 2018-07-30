import { apiPath } from './../../share/apipath';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  loader: boolean = true;
  api = apiPath.apiUrl;
  sessionItem:any;
  total_company:any;
  updated_company:any;
  constructor(private router: Router,private _http: Http) { }

  ngOnInit() {
    var company = window.location.hostname;
    // var company = 'Google fsdsdsdfsdf';
    console.log(company)
    // var company =   'Google fsdsdsdfsdf';  //"Thoughtwin
    this._http.get(this.api + 'nurture/lists/'+company).subscribe(res => {
      console.log("res.json().data.result[0].name")
      console.log(res.json().data)
      console.log(res.json().data.result[0].name)
      console.log(res.json().data.result[0].nurture_name_show)
    // this.first_nurture = ''
    //     // debugger
    console.log(this.api + 'urllist/'+res.json().data.result[0].name.split(" ").join("%20"))
        this._http.get(this.api + 'urllist/'+res.json().data.result[0].name).subscribe(res => {
          console.log(res.json())
        
        });


        this._http.get(this.api + 'url/show/'+res.json().data.result[0].nurture_name_show).subscribe(res => {
          console.log(res.json())
        
        });
        
  });
  
    this._http.get(this.api+'total/company').subscribe((data)=>{
    console.log(data.json().data.result);
    this.total_company = data.json().data.result.total_company;
    this.updated_company = data.json().data.result.updated_company;
    this.loader = false
    });

  }


  logout_user() {
    localStorage.clear();
    this.router.navigate(['/login']);
}

}
