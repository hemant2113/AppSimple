import { apiPath } from './../share/apipath';
import { CommonService } from './../services/common.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http,Response} from '@angular/http';
// import { CompanyAdminServiceService } from '../services/company-admin-service.service';



@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  company_id:any;
  loader: boolean = true;
  api = apiPath.apiUrl;
  company_name: string = "";
  company_url: string = "";
  logo: string = "";
  favicon:string='';
  id: number;
  model: any = {};
  fileToUpload: File = null;
  fileToUploadfav:File = null;
  imageUrl: string = "../assets/img/default-logo.png";
  favUrl: string = "../assets/img/default-ico.png"
  header_script:string ="";
  body_script:string; 
  sessionData:any;
  logoldpath:any;
  faviconldpath:any;
  selectLogo:boolean = false;
  selectFavicon:boolean = false;
  constructor(private common: CommonService,private _router: Router,private _route_ID: ActivatedRoute,private http: Http) { 
          
  }

  ngOnInit() {

    const company_id = +this._route_ID.snapshot.paramMap.get('search_id');
          console.log(company_id); 

    this.http.get(this.api+"company/"+company_id).subscribe((res: Response)=>{
      console.log(res);

            this.company_name = res.json().data.result.name;
            this.company_url = res.json().data.result.url;
            this.logo = res.json().data.result.logo;
            this.favicon = res.json().data.result.favicon;
            this.id = res.json().data.result.id;
            this.header_script = res.json().data.result.header_script; 
            this.body_script = res.json().data.result.body_script; 
            console.log(this.company_url)
            this.loader = false;
            this.logoldpath = res.json().data.result.logo
            this.faviconldpath = res.json().data.result.favicon

  });




}

onSubmit(e){
  e.preventDefault();
  const company_id = +this._route_ID.snapshot.paramMap.get('search_id');
  // var id = e.target.elements[0].value;
  // var company_name = e.target.elements[1].value;
  // var company_url = e.target.elements[2].value;
  var company_name = e.target.elements[1].value;
  var company_url = e.target.elements[2].value;
  var header_script = e.target.elements[5].value;
  var body_script = e.target.elements[5].value;

  console.log(company_name,company_url,header_script,body_script)
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
     

  if(this.fileToUploadfav){
    let dataFav = new FormData();
    dataFav.append('header_script', header_script);
    dataFav.append('field', 'image');
    dataFav.append('destination', 'company/fav');
    dataFav.append('image', this.fileToUploadfav);
    this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
      if (res.json().data.responseCode == 200) {
        console.log(res.json().data.result)                         
        this.favicon = res.json().data.result     
        let Comdata = new FormData();
        Comdata.append('url', company_url);
        Comdata.append('name', company_name);
        Comdata.append('header_script', header_script);
        Comdata.append('body_script', body_script);
        Comdata.append('favicon', res.json().data.result);

        this.http.put(this.api+'company/'+company_id, Comdata,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        if (res.json().data.responseCode == 200) {
          // this.ngOnInit();
          this.common.successNotify('Success', 'Company updated successfully');
            // window.location.reload();
         } else {
          this.common.errorNotify('Error', 'Something went wrong please try after sometime');

          // window.location.reload(); 
         }
      });            

        

      } else {
        this.favicon = this.faviconldpath
        console.log(res.json().data.error)  
      }

    });  
  }else{
    this.favicon = this.faviconldpath 
  }

  if(this.fileToUpload){
    let dataLogo = new FormData();
    dataLogo.append('header_script', header_script);
    dataLogo.append('field', 'image');
    dataLogo.append('destination', 'company/logo');
    dataLogo.append('image', this.fileToUpload);
    dataLogo.append('body_script', body_script);
  
    this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
      if (res.json().data.responseCode == 200) {
        console.log(res.json().data.result)                         
        this.logo = res.json().data.result     
        let Comdata = new FormData();
        Comdata.append('url', company_url);
        Comdata.append('name', company_name);
        Comdata.append('header_script', header_script);
        Comdata.append('body_script', body_script);
        Comdata.append('logo', res.json().data.result);

        this.http.put(this.api+'company/'+company_id, Comdata,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        if (res.json().data.responseCode == 200) {
          // this.ngOnInit();
          this.common.successNotify('Success', 'Company updated successfully');
            // window.location.reload();
         } else {
          this.common.errorNotify('Error', 'Something went wrong please try after sometime');

          // window.location.reload(); 
         }
      });            
    
      } else {
        this.logo = this.logoldpath 
        console.log(res.json().data.error)  
      }
    });
  }else{
    this.logo = this.logoldpath
  }
  

          if (this.fileToUpload == null && this.fileToUploadfav == null) {
              let data = new FormData();
              data.append('header_script', header_script);
              data.append('url', company_url);
              data.append('name', company_name);
              data.append('body_script', body_script);
             
              console.log(data);
              this.http.put(this.api+'company/'+company_id, data,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
              if (res.json().data.responseCode == 200) {
                // this.ngOnInit();
                this.common.successNotify('Success', 'Company updated successfully');
                  // window.location.reload();
               } else {
                this.common.errorNotify('Error', 'Something went wrong please try after sometime');

                // window.location.reload(); 
               }
              });  
          } 






}






























handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);
  console.log(this.fileToUpload);
 
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
    
  }
  reader.readAsDataURL(this.fileToUpload);
  this.selectLogo = true;
}
LogoRemove(){
  this.imageUrl = "../assets/img/default-logo.png"; 
}



handleFileInputfav(file: FileList) {
  this.fileToUploadfav = file.item(0);
  console.log(this.fileToUpload);
 
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.favUrl = event.target.result;
    
  }
  reader.readAsDataURL(this.fileToUploadfav);
  this.selectFavicon = true;
}
pathChange(){
  const company_id = +this._route_ID.snapshot.paramMap.get('search_id');
  this._router.navigate(['company-nurture',company_id]);

}


}