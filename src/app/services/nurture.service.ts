import { apiPath } from './../share/apipath';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NurtureService {
api = apiPath.apiUrl;
  constructor(private route: ActivatedRoute,public http: Http) { 
  }
  getNurture(nurture_id){
    return this.http.get(this.api+"nurture/"+nurture_id);

  }
  addNurture(name,desc,nurture_url,ids){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
       return this.http.post(this.api+'nurture', {name: name,description: desc,nurture_url: nurture_url,company:ids+""}, '{headers: headers;}');
       
    }
    addNurtureUser(name,desc,nurture_url,ids){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
     return this.http.post(this.api+'nurture', {name: name,description: desc,nurture_url: nurture_url,user:ids+""}, '{headers: headers;}');
     
  }
 
   getNurtureList(ids){
    
   return this.http.get(this.api+"nurture/list/"+ids);  //local-server
   }
 
   deleteNurture(id){
    
   return this.http.delete(this.api+"nurture/"+id);  //local-server
   }
   getNurtureUrlList(){
     
     return this.http.get(this.api+"nurture/url");  
   }
   deleteNurtureUrl(id){
   return this.http.delete(this.api+"nurture/url/"+id);  //local-server
   }
   getSingleNurture(id){
    return this.http.get(this.api+"nurture/"+id); 
   }
   getNurtureUrlById(id){
    return this.http.get(this.api+"nurture/"+id); 
   }
  
   
}
