import { apiPath } from './../share/apipath';
import {
  CommonService
 }
 from './../services/common.service';
 import {
  Component,
  OnInit,
  TemplateRef,
  NgModule
 }
 from '@angular/core';
 import {
  NurtureService
 }
 from '../services/nurture.service';
 import {
  Router,
  ActivatedRoute,
  Params
 }
 from '@angular/router';
 import {
  BsModalRef,
  BsModalService
 }
 from 'ngx-bootstrap/modal';
 import {
  Http,
  Response
 }
 from '@angular/http';
 
 
 
 @Component({
  selector: 'app-nurture',
  templateUrl: './nurture.component.html',
  styleUrls: ['./nurture.component.css']
 })
 export class NurtureComponent implements OnInit {
  columns = [{
   name: '',
   url: '',
   doc_script: ''
  }];
  loader: boolean = true;
  dataType: any;
  nurtures = [];
  ids: any;
  nurtures_urls: any;
  model: any = {};
  nurture_name: string = 'fgdestg';
  nurture_desc: string = 'fgdestg';
  nurture_company: any
  api = apiPath.apiUrl;
  company_name: string;
  company_id: any;
  company_url: string;
  public modalRef: BsModalRef;
  nurture_id_edit: number;
  arr_url_nurture_name = [];
  sessionItem: any;
  arr_url_nurture_url_name = [];
  delete_id: any;
  nurture_new_url_show = [];
  company_logo='';
  constructor(private common: CommonService, public http: Http, private modalService: BsModalService, public nurture_service: NurtureService, public router: Router, public route: ActivatedRoute) {}
 
  public openModal(template: TemplateRef < any > ) {
   this.modalRef = this.modalService.show(template); // {3}
  }
  ngOnInit() {
   const ids = +this.route.snapshot.paramMap.get('id');
 
   this.company_id = ids;
   this.http.get(this.api + "company/" + ids).subscribe((res: Response) => {
    this.company_name = res.json().data.result.name;

    this.company_url = res.json().data.result.url;

    this.company_logo = res.json().data.result.logo;

 
   });
   this.nurture_service.getNurtureList(ids).subscribe(data => {
 
    this.nurtures = data.json().data.result;
 console.log(this.nurtures)
    
    this.nurtures.forEach((element,position) => {
   
     this.arr_url_nurture_name.push(this.nurtures[position].nurture_name_show)

    });
    
    this.nurtures.forEach((element,position) => {
      if(element.id){
      
        this.nurture_new_url_show.push(this.nurtures[position].nurture_url[0].url_name_show)
      
      }
    });
   });
   this.nurture_service.getNurtureUrlList().subscribe(data => {
 
    this.nurtures_urls = data.json().data.result;
 
 
    console.log(this.nurtures_urls)
    this.loader = false;
   });
 





   
 
  }
  getNurtureDetails(id_nurture) {
 
 
   this.nurture_service.getSingleNurture(id_nurture).subscribe(data => {
    console.log(data)
    console.log(data.json().data.result.name);
    console.log(data.json().data.result.description);
    //  console.log(data.json().data.result.nurture_url[0]);
    //  console.log(data.json().data.result.description);
    this.nurture_name = data.json().data.result.name;
    this.nurture_company = data.json().data.result.company;
    this.nurture_desc = data.json().data.result.description;
    this.nurture_id_edit = data.json().data.result.id
   });
 
 
 
 
  }
 
  nurtureEdit(e) {
   this.ids = +this.route.snapshot.paramMap.get('id');
 
 
   e.preventDefault();
   var nurture_name = e.target.elements[0].value;
   var nurture_desc = e.target.elements[1].value;
   var nurture_company = e.target.elements[2].value;
   // console.log(nurture_name,nurture_desc,this.nurture_id_edit,this.nurture_company);
   var headers = new Headers();
   headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
   let data = new FormData();
   data.append('name', nurture_name);
   data.append('description', nurture_desc);
   data.append('company', this.ids);
   this.http.put(this.api + 'nurture/' + this.nurture_id_edit, data, '{headers: headers;}').subscribe((data) => {
    // window.location.reload();
   });
 
  }
 
 
  nurtureDelete(nurture) {
   this.nurture_service.deleteNurture(nurture.id).subscribe(data => {
    this.nurtures.splice(this.nurtures.indexOf(nurture), 1);
    this.modalRef.hide();
    if (data.json().data.responseCode == 200) {
     this.common.successNotify('Success', data.json().data.result + " Nurture")
    } else {
     this.common.errorNotify('Error', data.json().data.result)
    }
 
   });
  }
  urlDelete(nurtureurl) {
   this.nurture_service.deleteNurtureUrl(nurtureurl.id).subscribe(data => {
    this.nurtures_urls.splice(this.nurtures_urls.indexOf(nurtureurl), 1);
    this.modalRef.hide();
    if (data.json().data.responseCode == 200) {
     this.common.successNotify('Success', data.json().data.result + " Single Nurture Url")
    } else {
     this.common.errorNotify('Error', data.json().data.result)
    }
   });
 
  }
 
  addNurture(e) {
   e.preventDefault();
   var nurture_name = e.target.elements[0].value;
   var nurture_desc = e.target.elements[1].value;
   // var url_name= e.target.elements[2].value;
   // var url= e.target.elements[3].value;
 
   var nurture_url = this.columns
    // console.log(nurture_name,nurture_desc)
   const ids = +this.route.snapshot.paramMap.get('id');
   console.log(ids);
   this.nurture_service.addNurture(nurture_name, nurture_desc, nurture_url, ids).subscribe((data: Response) => {
    if (data.json().data.responseCode == 200) {
      console.log(this.nurtures) 
      console.log(this.nurtures)
      console.log(data.json().data.result)
      this.nurtures.push(data.json().data.result);
      console.log(this.nurtures)
      this.common.successNotify('Success', data.json().data.result + " Single Nurture Url")
     } else {
      this.common.errorNotify('Error', data.json().data.result)
     }
    
   });
 
   
 
  }
 
  nurtureView(nurture_id) {
   this.router.navigate(['nurture-view', nurture_id]);
  }
  nurtureEditPage(nurture_id) {
   this.router.navigate(['nurture-edit', nurture_id]);
  }
 
 
 
  addNewColumn() {
   var newItemNo = this.columns.length + 1;
 
 
   //  alert(newItemNo);
   this.columns.push({
    name: '',
    url: '',
    doc_script: ''
   });
 
 
  }
  removeColumn(index) {
   if (this.columns.length >= 2) {
    this.columns.splice(index, 1);
   }
 
 
 
  }
 
 
 
 
 
 
  idSet(nurture) {
   this.delete_id = nurture;
  }
  idSetUrl(nurture_url_single) {
   this.delete_id = nurture_url_single;
  }
 
 
 
 }
