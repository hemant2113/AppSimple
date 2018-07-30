import { apiPath } from './../share/apipath';
import { CommonService } from './../services/common.service';

import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  Http,
  Response
} from '@angular/http';



@Component({
  selector: 'app-edit-nurture',
  templateUrl: './edit-nurture.component.html',
  styleUrls: ['./edit-nurture.component.css']
})
export class EditNurtureComponent implements OnInit {
  columns = [{name:'', url:'',doc_script: ''}];
j:number = 1;

array = [];
company_name:string;

  api = apiPath.apiUrl;
  nurture_name:string = '';
  nurture_desc:string = '';
  company:any = '';
  nurture_url:any;
  nurtue_url_obj:any;
  sessionItem:any;
  company_logo= '';
  constructor(public common: CommonService,private notif: NotificationsService,private router:Router,public http: Http,public _route: ActivatedRoute) { }

  ngOnInit() {
    this.sessionItem = JSON.parse(localStorage.getItem('data'));
   const company_id = this.sessionItem.company

  const nurture_id = this._route.snapshot.paramMap.get('id');
  console.log(nurture_id);
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');


  this.http.get(this.api+'nurture/'+nurture_id).subscribe((data: Response)=>{
    console.log(data.json().data.result.name);
    this.nurture_name = data.json().data.result.name;
    this.nurture_desc = data.json().data.result.description;
    this.company = data.json().data.result.company;

  console.log(data.json().data.result.nurture_url)
  this.nurtue_url_obj = data.json().data.result.nurture_url;





  console.log()
  this.http.get(this.api+"company/"+this.company).subscribe((res: Response)=>{
    this.company_name = res.json().data.result.name;
    this.company_logo = res.json().data.result.logo;
    var com_id = res.json().data.result.id;
  }); 
});


}






onSubmmit(e){
  e.preventDefault();
  var nurture_name = e.target.elements[0].value;
  var company = e.target.elements[1].value;
  var nurture_desc= e.target.elements[2].value;
  
  console.log(this.columns)
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // let data = new FormData();
  // data.append('name', nurture_name);
  // data.append('description', nurture_desc);
  // data.append('nurture_url_1', this.nurtue_url_obj);
 
  const nurture_id = +this._route.snapshot.paramMap.get('id');
             console.log(nurture_id,this.nurtue_url_obj);
  this.http.put(this.api+'nurture/'+nurture_id,{name: nurture_name, company: company,description: nurture_desc,nurture_url_1: this.nurtue_url_obj,nurture_url_2: this.columns},'{headers: headers;}').subscribe((data)=>{
console.log(data),company;

if (data.json().data.responseCode == 200) {
  this.common.successNotify('Success', data.json().data.result + " ")
 } else {
  this.common.errorNotify('Error', data.json().data.result)
 }
  });

             
 
  // window.location.reload();
  console.log(nurture_name,nurture_desc,this.nurtue_url_obj)
}

removeRow(nurture_url){

  this.http.delete(this.api+'nurture/url/'+nurture_url.id).subscribe((res: Response) => {
    this.nurtue_url_obj.splice(this.nurtue_url_obj.indexOf(nurture_url),1);
});
 

}





addNewColumn(){
  var newItemNo = this.columns.length+1;


//  alert(newItemNo);
this.columns.push({name:'', url:'',doc_script: ''});
console.log(this.columns)

} 
removeColumn(index){
if(this.columns.length >= 0){
this.columns.splice( index, 1);
}


}












}
