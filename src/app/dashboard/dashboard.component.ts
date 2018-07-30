import { apiPath } from './../share/apipath';
import { NotificationsService } from 'angular2-notifications';
import { HeaderData, CommonService } from './../services/common.service';
import {
    Component,
    OnInit, TemplateRef
} from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
    DataService
} from '../services/data.service';

import {
    Http,
    Response
} from '@angular/http';
import {
    Router
} from '@angular/router';
import { UploadImageService } from '../upload-image.service';
import { $ } from 'protractor';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    icon: boolean = true;
    headerData = HeaderData.headers;
    loader: boolean = true;
    posts = [];
    company_name: string = "";
    company_url: string = "";
    logo: string = "";
    file:any;
    i: number = 1;
    id: number;
    id_post: any;
    sessionItem:any;
    imageUrl: string = "";
    api = apiPath.apiUrl;
    fileToUploadfav:File = null;
    favUrl: string = ""
    tracking_id='';
    // imageUrlT: string = "../assets/img/default-ico.png";
    fileToUpload: File = null;
    model: any = {};
    delete_id: any;
    public modalRef: BsModalRef;
    faviconldpath:any;
    logoldpath:any;
    favicon:string='';
    lValue:boolean = false;
    fValue:boolean = false;
    constructor(public common: CommonService  ,private notif: NotificationsService,public logout: CommonService ,private modalService: BsModalService,private imageService : UploadImageService,public dataservice: DataService, private http: Http, private router: Router) {
        // alert(this.headerData)
        this.dataservice.getData().subscribe(posts => {
           
            this.posts = posts.json().data.result;
     
        this.loader = false;
        });
    }
    hello(){
        
    }

   
    public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template); // {3}
    }
      onSubmitUser() {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
      }
      
    //////

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
        console.log(this.fileToUpload);
       
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
          
        }
        reader.readAsDataURL(this.fileToUpload);
        this.lValue = true;
      }
      handleFileInputfav(file: FileList) {
        this.fileToUploadfav = file.item(0);
        console.log(this.fileToUpload);
       
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.favUrl = event.target.result;
          
        }
        reader.readAsDataURL(this.fileToUploadfav);
        this.fValue = true;
        
        
      }
      ///////
  
      OnSubmit(Image){
          console.log('imaghedsfraggter')
       this.imageService.postFile(this.fileToUpload).subscribe(
            data =>{
              console.log('done');
              console.log(data);
              Image.value = null;
              this.imageUrl = "../assets/img/default-logo.png";
              // this.imageUrlT = "../assets/img/default-ico.png";
    
          }
           
          );
         
       
       }
    ngOnInit() {
        this.dataservice.getData().subscribe(posts => {
            // console.log(this.posts = posts.json()[0]);
            this.posts = posts.json().data.result
          
        });
       
    }
    onsubmit(e){
        e.preventDefault();
        var file = e.target.elements[0].value;
        console.log(file)

    }
    addCompany() {
      
      var companyName = this.model.companyName;
      var companyUrl = this.model.companyUrl;
      var hubspotId = this.model.hubspotid;
       console.log(this.fileToUpload );      
       var fav = null;  
       var logo = null;  
       console.log(companyName,companyUrl)
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       headers.append('Accept', 'application/json');
       
      
       if(this.fileToUploadfav){
        let dataFav = new FormData();
        // dataFav.append('header_script', header_script);
        dataFav.append('field', 'image');
        dataFav.append('destination', 'company/fav');
        dataFav.append('image', this.fileToUploadfav);
        this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
          if (res.json().data.responseCode == 200) {
            console.log(res.json().data.result)                         
            this.favicon = res.json().data.result     
            let Comdata = new FormData();
            Comdata.append('url', companyUrl);
            Comdata.append('name', companyName);
            Comdata.append('header_script', hubspotId);

            
            // Comdata.append('header_script', header_script);
            // Comdata.append('body_script', body_script);
            Comdata.append('favicon', res.json().data.result);
    
            this.http.post(this.api+'company', Comdata,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
            if (res.json().data.responseCode == 200) {
                console.log(this.posts)
                console.log(res.json().data.result)
                this.posts.push(res.json().data.result);
                console.log(this.posts)
              this.common.successNotify('Success', 'Company Added successfully');
                this.modalRef.hide;
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
        // dataLogo.append('header_script', header_script);
        dataLogo.append('field', 'image');
        dataLogo.append('destination', 'company/logo');
        dataLogo.append('image', this.fileToUpload);
        // dataLogo.append('body_script', body_script);
      
        this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
          if (res.json().data.responseCode == 200) {
            console.log(res.json().data.result)                         
            this.logo = res.json().data.result     
            let Comdata = new FormData();
            Comdata.append('url', companyUrl);
            Comdata.append('name', companyName);
            Comdata.append('header_script', hubspotId);
            // Comdata.append('body_script', body_script);
            Comdata.append('logo', res.json().data.result);
    
            this.http.post(this.api+'company', Comdata,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
            if (res.json().data.responseCode == 200) {
                console.log(this.posts)
                console.log(res.json().data.result)
                this.posts.push(res.json().data.result);
                console.log(this.posts)
              this.common.successNotify('Success', 'Company Added successfully');
                
              this.modalRef.hide;
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
        // data.append('header_script', header_script);
        data.append('url', companyUrl);
        data.append('name', companyName);
        data.append('header_script', hubspotId);
       
        console.log(data);
        this.http.post(this.api+'company', data,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        if (res.json().data.responseCode == 200) {
            console.log(this.posts)
            console.log(res.json().data.result)
            this.posts.push(res.json().data.result);
            console.log(this.posts)
          this.common.successNotify('Success', 'Company Added successfully');
          this.modalRef.hide;
         } else {
          this.common.errorNotify('Error', 'Something went wrong please try after sometime');

          // window.location.reload(); 
         }
        });  
    }    

    }

    addCompanyTwo(e) {
        e.preventDefault();
        var id = e.target.elements[0].value;
        var company_name = e.target.elements[1].value;
        var company_url = e.target.elements[2].value;
        var tracking_id = e.target.elements[3].value;
        
       
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
     

        if (this.fileToUpload == null) {
            let data = new FormData();
            data.append('name', company_name);
            data.append('url', company_url);
            data.append('body_script', tracking_id);

            
            console.log(data);
            this.http.put(this.api+'company/'+id, data,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
            if (res.json().data.responseCode == 200) {
                console.log(this.posts)
                console.log(res.json().data.result)
                this.posts.push(res.json().data.result);
                console.log(this.posts)
              this.ngOnInit();
              this.common.successNotify('Success',res.json().data.result)
            this.modalRef.hide();
             } else {
               alert()
               this.common.errorNotify('Error',res.json().data.result)
             }
            });  
        } else {


            let data = new FormData();
            data.append('field', 'image');
            data.append('destination', 'company/logo');
            data.append('image', this.fileToUpload);
            console.log(data);


            this.http.post(this.api+'media/upload', data,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
                if (res.json().data.responseCode == 200) {
                                        
                    this.logo = res.json().data.result     
                    let Comdata = new FormData();
                    Comdata.append('name', company_name);
                    Comdata.append('url', company_url);
                    Comdata.append('logo', this.logo);
                    Comdata.append('body_script', tracking_id);
                    tracking_id
                    this.http.put(this.api+'company/'+id, Comdata,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
                        if (res.json().data.responseCode == 200) {
                            console.log(this.posts)
                            console.log(res.json().data.result)
                            this.posts.push(res.json().data.result);
                            console.log(this.posts)
                          this.ngOnInit();
                          this.common.successNotify('Success',res.json().data.result)
                              this.modalRef.hide();
                        } else {
                            this.common.errorNotify('Error',res.json().data.result)  
                        }
                    });
            
                    
                } else {
                    this.common.errorNotify('Error',res.json().data.error)
                    
                }
            });




        }



    }
    editcompany(id) {
      this.http.get(this.api+'company/' + id).subscribe((res: Response) => {
            console.log(res.json().data.result.name);
            this.company_name = res.json().data.result.name;
            this.company_url = res.json().data.result.url;
            this.logo = res.json().data.result.logo;
            this.favicon = res.json().data.result.favicon;
            this.id = res.json().data.result.id;
            this.tracking_id = res.json().data.result.body_script;
        });
        
    }

   
  
    deleteComapny(post) {
        this.http.delete(this.api+'company/'+post.id).subscribe((res: Response) => {
            this.posts.splice(this.posts.indexOf(post),1);
            this.common.successNotify('Success',res.json().data.result)
              this.modalRef.hide();
            
        });
}

idSet(post) {
    this.delete_id = post;
}


hide(){
    this.lValue = false;
    this.fValue = false;

 this.imageUrl = '';  
 this.favUrl = '';   
 
}

}
