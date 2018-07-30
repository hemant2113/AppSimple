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
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
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
    constructor(private titleService: Title, private modalService: BsModalService, private router: Router, private sanitizer: DomSanitizer, public nurture_service: NurtureService, private http: Http, private _route: ActivatedRoute, public _routerActivated: ActivatedRoute, public _http: Http, public logutser: CommonService) {
       
    }


    public modalRef: BsModalRef;

    public openModal(template: TemplateRef < any > ) {
        this.modalRef = this.modalService.show(template);
    }


    ngOnInit() {
        if (window.location.href.search('%2F')){
           history.pushState('stateObj', "page 2", window.location.href.split('%2F').join('/'));   
        }
       const nurture_id = this._routerActivated.snapshot.paramMap.get('nurture_name').split('-')[0];

        this._http.get(this.api + 'nurtureurl/list/' + nurture_id).subscribe(res => {
            if (res.json().data.responseCode == '200' && res.json().data.result != '') {
                this.nurture_url_obj = res.json().data.result;
                this.firstUrl = res.json().data.result[0].url


                const full_url = window.location.href;

                this.open_url_name = full_url.split("/");
                this.nurture_url_obj.forEach((element, index) => {
                    if (element.url_name_show == this.open_url_name[5] || '-'+element.url_name_show+'-' == this.open_url_name[5] || '-'+element.url_name_show == this.open_url_name[5] || element.url_name_show+'-' == this.open_url_name[5]) {
                        

                    
                       setTimeout(() => {
                        document.getElementsByTagName("iframe")[1].setAttribute("src", element.url);
    
                       }, 1000);
                      
                       this.titleService.setTitle(localStorage.getItem("tokenTitle"));

                        this.select(index)
                    }
                });


            } else {
                alert(res.json().data.result);
            }
            var url = window.location.href;
          
        

        });

        const domain_name = window.location.hostname;

        this._http.post(this.api + 'company/detail', {
            domain_name: domain_name
        }, '{headers: headers}').subscribe(res => {

            this.logo = res.json().data.result.logo;
            this.headerScript = res.json().data.result.header_script;
            this.bodyScript = res.json().data.result.body_script;
            this.nurture_obj = res.json().data.result.nurture_data;
           
           
            if (this.headerScript) {
                this.logutser.loadScript(this.headerScript, 'head')
            }
            if (this.bodyScript) {
                this.logutser.loadBodyScript(this.bodyScript, 'body');
            }


        });



       



        

    }
    

    listClick(event, newValue) {
        this.selectedItem = newValue; // don't forget to update the model here
    }

    setTitle(resp){
        localStorage.setItem("tokenTitle", resp);
    }


    urlAppend(dir) {

        // alert(dir)
        // this.titleService.setTitle(dir);
        var data = '';
        var output = '';
        var url = window.location.href;
        if (url.lastIndexOf('/') > -1) {


            var i = 0,
                strLength = dir.length;

            for (i; i < strLength; i++) {

                dir = dir.replace(" ", "-");

            }

            output = url.substring(0, url.lastIndexOf('/') + 1);


            output = output + dir.replace(' ', '-');
            setTimeout(() => {
                history.pushState('stateObj', "page 2", output);
            }, 50);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }


    }
    docScript(doc) {
        // this.logutser.loadScript(doc, 'head')
    }


    select(index: number) {
        this.selectedIndex = index;
    }


}