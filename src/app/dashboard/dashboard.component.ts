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
    hubspotid:string;
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
    image = [];
    constructor(public common: CommonService  ,private notif: NotificationsService,public logout: CommonService ,private modalService: BsModalService,private imageService : UploadImageService,public dataservice: DataService, private http: Http, private router: Router) {
        // alert(this.headerData)
        this.dataservice.getData().subscribe(posts => {
           
            this.posts = posts.json().data.result;
     
        this.loader = false;
        });
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
      console.log(hubspotId)   
         var headers = new Headers();
         headers.append('Content-Type', 'application/json');
         headers.append('Accept', 'application/json');

if(this.fileToUpload)
{
        let dataLogo = new FormData();
        dataLogo.append('field', 'image');
        dataLogo.append('destination', 'company/logo');
        dataLogo.append('image', this.fileToUpload);
        
        
         
        if(this.fileToUploadfav)
        {
            let dataFav = new FormData();
            dataFav.append('field', 'image');
            dataFav.append('destination', 'company/favicon');
            dataFav.append('image', this.fileToUploadfav);
        
            
        
        this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.logo = res.json().data.result
         
        this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.favicon = res.json().data.result
        // console.log(companyName,companyUrl,hubspotId,this.logo,this.favicon)
        this.insert(companyName,companyUrl,hubspotId,this.logo,this.favicon)
        });
        });
        
        
           
        }
        else
        {
        this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.logo = res.json().data.result
        // console.log(companyName,companyUrl,hubspotId,this.logo,this.favicon)
        this.insert(companyName,companyUrl,hubspotId,this.logo,null)
        });
         
        }
}
else
{ 
            
        

        if(this.fileToUploadfav)
        {  
            let dataFav = new FormData();
            dataFav.append('field', 'image');
            dataFav.append('destination', 'company/favicon');
            dataFav.append('image', this.fileToUploadfav);
        
            
        
      
         
            this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
            this.favicon = res.json().data.result
            // console.log(companyName,companyUrl,hubspotId,'',this.favicon)
            this.insert(companyName,companyUrl,hubspotId,null,this.favicon)
        });
       
         
        }
        else
        {
          
          
           this.insert(companyName,companyUrl,hubspotId,'','')  
        }

}
      
    
    }

    addCompanyTwo(e) {
        e.preventDefault();
        var id = e.target.elements[0].value;
        var company_name = e.target.elements[1].value;
        var company_url = e.target.elements[2].value;
        var tracking_id = e.target.elements[3].value;
        
       console.log(this.image)
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');


if(this.fileToUpload)
{
        let dataLogo = new FormData();
        dataLogo.append('field', 'image');
        dataLogo.append('destination', 'company/logo');
        dataLogo.append('image', this.fileToUpload);
        
        
         
        if(this.fileToUploadfav )
        {
            let dataFav = new FormData();
            dataFav.append('field', 'image');
            dataFav.append('destination', 'company/favicon');
            dataFav.append('image', this.fileToUploadfav);
        
            
        
        this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.logo = res.json().data.result
         
        this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.favicon = res.json().data.result
        // console.log(companyName,companyUrl,hubspotId,this.logo,this.favicon)
        this.update(id,company_name,company_url,tracking_id,this.logo,this.favicon)
        });
        });
        
        
           
        }
        else
        {
        this.http.post(this.api+'media/upload', dataLogo,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
        this.logo = res.json().data.result
        // console.log(companyName,companyUrl,hubspotId,this.logo,this.favicon)
        this.update(id,company_name,company_url,tracking_id,this.logo,this.image[1])

        });
         
        }
}
else
{ 
            
        

        if(this.fileToUploadfav)
        {  
            let dataFav = new FormData();
            dataFav.append('field', 'image');
            dataFav.append('destination', 'company/favicon');
            dataFav.append('image', this.fileToUploadfav);
        
            
        
      
         
            this.http.post(this.api+'media/upload', dataFav,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
            this.favicon = res.json().data.result
            // console.log(companyName,companyUrl,hubspotId,'',this.favicon)
            this.update(id,company_name,company_url,tracking_id,this.image[0],this.favicon)

        });
       
         
        }
        else
        {
          
          
           this.update(id,company_name,company_url,tracking_id,this.image[0],this.image[1])

        }
     

        
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
            this.tracking_id = res.json().data.result.header_script;

            // this.tracking_id = res.json().data.result.body_script;
            console.log(this.logo,this.favicon)



            this.image.push(this.logo)
            this.image.push(this.favicon)
            console.log(this.image)

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



insert(com_name,com_url,hub_id,logo_s3,fav_s3){

    let data = new FormData();
    // data.append('header_script', header_script);
    data.append('url', com_url);
    data.append('name', com_name);
    data.append('header_script', hub_id);
    data.append('logo', logo_s3);
    data.append('favicon', fav_s3);

    console.log(data);
    this.http.post(this.api+'company', data,'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
    if (res.json().data.responseCode == 200) {
        console.log(this.posts)
        console.log(res.json().data.result)
        this.posts.push(res.json().data.result);
        console.log(this.posts)
        this.ngOnInit();
        this.common.successNotify('Success', 'Company Added successfully');
        this.modalRef.hide();      
    } else {
      this.common.errorNotify('Error', 'Something went wrong please try after sometime');

      // window.location.reload(); 
     }
    });  
}






update(id,com_name,com_url,hub_id,logo_s3,fav_s3){

    const data = new FormData();
    // data.append('header_script', header_script);
    data.append('url', com_url);
    data.append('name', com_name);
    data.append('header_script', hub_id);
    data.append('logo', logo_s3);
    data.append('favicon', fav_s3);

    // console.log(id,com_name,com_url,hub_id,logo_s3,fav_s3);
    // console.log({name:com_name,url:com_url,header_script:hub_id,logo:logo_s3,favicon:fav_s3})
    this.http.put(this.api+'company/'+id, {name:com_name,url:com_url,header_script:hub_id,logo:logo_s3,favicon:fav_s3},'{headers: headers}').subscribe((res: Response)=>{console.log('res==>', res)
    if (res.json().data.responseCode == 200) {
        // console.log(this.posts)
        // console.log(res.json())
        // this.posts.push({name:com_name,url:com_url,header_script:hub_id,logo:logo_s3,favicon:fav_s3});
        // console.log(this.posts)
this.ngOnInit();
      this.common.successNotify('Success', 'Company Update successfully');
      this.modalRef.hide();

     } else {
      this.common.errorNotify('Error', 'Something went wrong please try after sometime');

      // window.location.reload(); 
     }
    });  
}

}
