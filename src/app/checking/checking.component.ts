import { apiPath } from './../share/apipath';
import {
  CommonService
}
from './../services/common.service';
import {
  Component,
  OnInit,
  TemplateRef
}
from '@angular/core';
import {
  Http,
  Response
}
from '@angular/http';
import {
  DomSanitizer
}
from '@angular/platform-browser';
import {
  NurtureService
}
from '../services/nurture.service';
import {
  ActivatedRoute,
  Router
}
from '@angular/router';
import {
  Title
}
from '@angular/platform-browser';
import {
  SafeUrl
}
from '@angular/platform-browser';


import {
  BsModalRef,
  BsModalService
}
from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {
  nurture_url_obj = [];
  api = apiPath.apiUrl;
  firstUrl: string;
  logo: string;
  selectedItem: any;
  headerScript: string;
  bodyScript: string;
  selectedIndex: number;
  full_url:string;
  nurture_obj=[];
  open_url_name = [];
  first_nurture = '';
  constructor(private titleService: Title, private modalService: BsModalService, private router: Router, private sanitizer: DomSanitizer, public nurture_service: NurtureService, private http: Http, private _route: ActivatedRoute, public _routerActivated: ActivatedRoute, public _http: Http, public logutser: CommonService) {
     
  }


  public modalRef: BsModalRef;

  public openModal(template: TemplateRef < any > ) {
      this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {

     
      var company = window.location.hostname;
      // var company = 'Google fsdsdsdfsdf';
      console.log(company)
      // var company =   'Google fsdsdsdfsdf';  //"Thoughtwin
      this._http.get(this.api + 'nurture/lists/'+company).subscribe(res => {
        console.log("res.json().data.result[0].name")
        console.log(res.json().data.result[0].name)
      // this.first_nurture = ''
      //     // debugger
      //     this._http.get(this.api + 'urllist/'+"123456 The #State Of** Application   Security 19991").subscribe(res => {
      //       console.log(res.json())
          
      //     });
      //     console.log(this.first_nurture)
    });
      

}
  

  listClick(event, newValue) {
      this.selectedItem = newValue; // don't forget to update the model here

  }
setTitle(dir){
  this.titleService.setTitle(dir);
}



  urlAppend(dir) {

      // alert(dir)
      // this.titleService.setTitle(dir);

      var data = '';
      var output = '';
      var url = window.location.href;
      if (url.lastIndexOf('/checking') > -1) {


          var i = 0,
              strLength = dir.length;

          // for (i; i < strLength; i++) {

          //     dir = dir.replace(" ", "-");

          // }

          output = url.substring(0, url.lastIndexOf('/checking') + 9);


          output = output + '-' +dir;
          setTimeout(() => {
              history.pushState('stateObj', "page 2", output);
          }, 50);
          // setTimeout(() => {
          //     window.location.reload();
          // }, 100);
      }


  }
  docScript(doc) {
      this.logutser.loadScript(doc, 'head')
     }


  select(index: number) {
      this.selectedIndex = index;
  }


}