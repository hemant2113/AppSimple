import { apiPath } from './../../share/apipath';
import { CommonService } from './../../services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-edit-nurture-company',
  templateUrl: './edit-nurture-company.component.html',
  styleUrls: ['./edit-nurture-company.component.css']
})
export class EditNurtureCompanyComponent implements OnInit {
  loader: boolean = true;
api = apiPath.apiUrl;
  columns = [];
nurture_name:string = '';
nurture_desc:string = '';
company:any = '';
nurture_url:any;
nurtue_url_obj:any;
company_name:any;

  constructor(public common:CommonService,private notif: NotificationsService ,public _route: ActivatedRoute, public http: Http) { }

  ngOnInit() {
    const nurture_id = this._route.snapshot.paramMap.get('id');
    console.log(nurture_id);

    this.http.get(this.api+'nurture/'+nurture_id).subscribe((data)=>{
      console.log(data.json().data.result.name);
      this.nurture_name = data.json().data.result.name;
      this.nurture_desc = data.json().data.result.description;
      this.company = data.json().data.result.company;
  
    console.log(data.json().data.result.nurture_url)
    this.nurtue_url_obj = data.json().data.result.nurture_url;
  
    this.http.get(this.api+"company/"+this.company).subscribe((res)=>{
      this.company_name = res.json().data.result.name;
      this.loader = false;
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
if(data.json().data.responseCode == 200 ){
  this.common.successNotify('Success' ,data.json().data.result )

}else{
  // alert(res.json().data.responceCode);
  this.common.errorNotify('Error' ,data.json().data.result )
}

  });

             
 

  console.log(nurture_name,nurture_desc,this.nurtue_url_obj)
}

removeRow(nurture_url){

  this.http.delete(this.api+'nurture/url/'+nurture_url.id).subscribe((res) => {
    this.nurtue_url_obj.splice(this.nurtue_url_obj.indexOf(nurture_url),1);
});
 

}





addNewColumn(){
  var newItemNo = this.columns.length+1;


//  alert(newItemNo);
this.columns.push({name:'', url:''});
console.log(this.columns)

} 
removeColumn(index){
if(this.columns.length >= 0){
this.columns.splice( index, 1);
}


}



}
