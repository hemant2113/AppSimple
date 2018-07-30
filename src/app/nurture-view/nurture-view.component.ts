import { apiPath } from './../share/apipath';
import { Component, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { DomSanitizer} from '@angular/platform-browser';
import { NurtureService } from '../services/nurture.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-nurture-view',
  templateUrl: './nurture-view.component.html',
  styleUrls: ['./nurture-view.component.css']
})
export class NurtureViewComponent implements OnInit {
  nurtures:any;
  nurture_url:any;
  nurture_url_one:any;
  src:string ="";
  firstUrl:string = '';
  sessionItem:any;
  company_id:any;
  api =apiPath.apiUrl;
  logo:string ='';
  constructor(private router: Router,private sanitizer: DomSanitizer,public nurture_service: NurtureService,private http: Http,private _route: ActivatedRoute) { }

        ngOnInit() {

          this.sessionItem = JSON.parse(localStorage.getItem('data')); 
          console.log(this.sessionItem.company)
         
          this.company_id = this.sessionItem.company;



 this.http.get(this.api+"company/"+this.company_id).subscribe((res: Response)=>{
           this.logo = res.json().data.result.logo;


 });




          const ids = +this._route.snapshot.paramMap.get('id');
                       console.log(ids);
          
                        this.nurture_service.getNurtureUrlById(ids).subscribe(data => {
                        this.nurtures = data.json().data.result;
                        this.nurture_url = data.json().data.result.nurture_url;
                        this.firstUrl = this.nurture_url[0].url;

                        document.getElementsByTagName("iframe")[0].setAttribute("src", this.firstUrl); 

                        // alert(this.firstUrl);
                        // console.log(data.json().data.result.nurture_url.length)
                        
                        // if (data.json().data.result.nurture_url.length >=2 ) {
                        //       this.nurture_url = data.json().data.result.nurture_url;
                        // } else {
                        //   this.nurture_url_one = data.json().data.result.nurture_url;
                        // }
                        



                      });
      
        }

        
}
