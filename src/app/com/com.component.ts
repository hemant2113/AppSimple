import { apiPath } from './../share/apipath';

import {
  Title
}
from '@angular/platform-browser';
import {
  Component,
  OnInit,
  TemplateRef
}
from '@angular/core';
import {
  Location
}
from '@angular/common';
import {
  Router,
  ActivatedRoute
}
from '@angular/router';
import {
  Http
}
from '@angular/http';


import {
  BsModalRef,
  BsModalService
}
from 'ngx-bootstrap/modal';
import { CommonService } from '../services/common.service';

@
Component({
  selector: 'app-com',
  templateUrl: './com.component.html',
  styleUrls: ['./com.component.css']
})
export class ComComponent implements OnInit {
  selectedIndex:number;
  new_nurture_name = [];
  domain_name: any;
  api = apiPath.apiUrl;
  data: any;
  nurture_name_append = '';
  company_name: string;
  nurture_name: string;
  nurture_obj: any;
  nurture_url_obj: any;
  firstUrl: string;
  logo: string;
  fav_icon: string;
  header_script: string;
  arr_url_nurture_name = [];
  arr_url_nurture_url = [];
  firstUrlName: string;
  nurture_url = [];
  url: string;
  new_nurture_ids = [];
  bodyScript:any;
  company_url:string;
  titleArray = [];
  constructor(public common:CommonService ,private titleService: Title, private modalService: BsModalService, public location: Location, public _routerActivate: ActivatedRoute, public _router: Router, public _http: Http) {

  }

  public modalRef: BsModalRef;

  public openModal(template: TemplateRef < any > ) {
      this.modalRef = this.modalService.show(template); // {3}
  }


  ngOnInit() {
      this.select();
      const domain_name = window.location.hostname;
      this._http.post(this.api + 'company/detail', {
          domain_name: domain_name
      }, '{headers: headers}').subscribe(res => {
          this.company_name = res.json().data.result.name;
          this.company_url = res.json().data.result.url;
          this.data = res.json().data;
          this.logo = res.json().data.result.logo;
          this.fav_icon = res.json().data.result.favicon;
          this.header_script = res.json().data.result.header_script;
          this.nurture_obj = res.json().data.result.nurture_data;

          this.bodyScript = res.json().data.result.body_script;
          this.nurture_obj = res.json().data.result.nurture_data;
         
          if (this.bodyScript) {
              this.common.loadBodyScript(this.bodyScript, 'body');
          }


          document.getElementsByTagName("link")[0].setAttribute("href", this.fav_icon);
         
         
          this.nurture_obj.forEach(element => {
            this.new_nurture_name.push(element.nurture_name_show);
           this.titleArray.push(element.nurture_url[0].name);
        });
        this.titleService.setTitle(this.company_url);


          this.nurture_obj.forEach((element,position) => {
              this.arr_url_nurture_name.push((this.nurture_obj[position].nurture_url[0].url_name_show));
          });
          if (window.location.href.search("spiel") == -1) {
              history.pushState('stateObj', "page 2", this.new_nurture_name[0]);

          } else {

          }
          const full_url = window.location.href;
          var leng = full_url.split(this.company_url).length
          if (leng ==  2) {
          const tar = full_url.split("/spiel").length
               if (tar >= 2) {
                 this.titleService.setTitle(localStorage.getItem("tokenTitle"));
                
               } else {
                this.titleService.setTitle(this.company_name);

               }
          }else{
            this.titleService.setTitle(this.company_url); 
          } 
          this.firstUrl = res.json().data.result.nurture_data[0].nurture_url[0].url;
          this.firstUrlName = res.json().data.result.nurture_data[0].nurture_url[0].name;
         if(this.firstUrl.search('.pdf')!= -1)
        {
          document.getElementsByTagName("iframe")[0].setAttribute("src", 'https://docs.google.com/viewer?url='+this.firstUrl+'&embedded=true&output=embed');

        }else{
          document.getElementsByTagName("iframe")[0].setAttribute("src", this.firstUrl);

        }

          this.nurture_url_obj = res.json().data.result.nurture_data[0].nurture_url[0];
          this.nurture_name = res.json().data.result.nurture_data[0].nurture_url[0].url
          
          if (this.nurture_obj.length == 1 && !window.location.href.includes("/spiel/")) {
            const id = this.nurture_obj[0].id;
           
              this._router.navigate(['spiel',+id+'-'+this.new_nurture_name[0]+'-/'+this.arr_url_nurture_name[0]])
                        
          }
        });

  }
  ClickFrom(nurture_name) {
      this._router.navigate(['spiel', nurture_name]);
  }
  docScript(id) {
      this.url = this.nurture_obj[id].nurture_url[0].name.split(" ").join("-");
  }
  select() {
    this.selectedIndex = 0;
  }
  setTitle(index){
    localStorage.setItem("tokenTitle", this.titleArray[index]);
    
  }

  
   
   
 
}
