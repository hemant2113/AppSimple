import { apiPath } from './../share/apipath';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { UserListService } from '../user-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Http,Response} from '@angular/http';
import { NurtureService } from '../services/nurture.service';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {
  api = apiPath.apiUrl;
  loader: boolean = true;
  users = [];
  route_value:any;
  firstName:string = '';
  lastName:string = '';
  userName:string = '';
  password:string = '';
  email:string = '';
  companyName:string = '';
  company_name:string;
  sessionItem:any;
  email_error:any;
  email_msg:string;
  delete_id: any;
  green:boolean;
  red:boolean;
  company_logo:string;
  constructor(private common: CommonService ,private notif: NotificationsService,public nurture_service: NurtureService,private http: Http,private modalService: BsModalService,public userlistservice: UserListService,private route: ActivatedRoute,
    private router: Router) { 
     this.route_value = this.route.params.subscribe( params => console.log(params.id) );
      console.log(this.route_value.id)
    }
    public modalRef: BsModalRef;
    public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template); // {3}
    }

  ngOnInit() {
    const ids = +this.route.snapshot.paramMap.get('id');
    console.log(ids);   // Router se id nikali 
   
    
       this.http.get(this.api+"company/"+ids).subscribe((res: Response)=>{
       this.company_name = res.json().data.result.name;
       this.company_logo = res.json().data.result.logo;

    });
  
    this.userlistservice.getUserList(ids).subscribe(data => {
      console.log(data)
      this.users = data.json().data.result;
     
        this.loader = false; 
      
    });
    
  }

  model: any = {};
 
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
  onSubmitUser(e){
    e.preventDefault();
        
             var firstName = this.model.firstName;
             var lastName = this.model.lastName;
             var email = this.model.email;
            //  var role = this.model.firstName;
            var password = this.model.password;


            //  console.log(userName,firstName,lastName,email,role,company,password);
             let header = new Headers();
             header.set('Content-Type', 'multipart/form-data');


             const ids = +this.route.snapshot.paramMap.get('id');
            // console.log({first_name: firstName,last_name: lastName,email: email,passsword: password,role: "3",company: ids})
            let data = new FormData();
            data.append('first_name', firstName);
             data.append('last_name', lastName );
             data.append('email', email );
             data.append('role', 3+"" );
                  
                 console.log(ids);
             data.append('company', ids+"");
             data.append('password', password );
             console.log(data);
             
             this.http.post(this.api+'user', data,'{ headers: header}').subscribe((res: Response) => {
              console.log(res);
              if (res.json().data.responseCode == 200 || res.json().data.responseCode == 201) {
                console.log(this.users)
                console.log(res.json().data.result)
                this.users.push(res.json().data.result);
                console.log(this.users)
              this.ngOnInit();
                this.notif.success(
                  'Success',
                  'User Created successfully',
                  {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: true,
                    maxLength: 50,
                    // position: ["top", "top"]
                  }
                  
                )
                this.modalRef.hide();
                this.ngOnInit(); 
             } else {
              //  alert(res.json().data.error)  
               this.notif.error(
                'Error',
                res.json().data.error,
                {
                  timeOut: 3000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 50,
                  // position: ["top", "top"]
                }
                
              )
             }
         
        });

  }
  onSubmitUserEdit(e){
    e.preventDefault();
        
             
             var firstName = this.model.firstNameE;
             var lastName = this.model.lastNameE;
             var email = this.model.emailE;
              var id = this.model.id;
       
             
            
             console.log(firstName,lastName,email,"user_id="+id);
             let header = new Headers();
             header.set('Content-Type', 'multipart/form-data');

             let data = new FormData();
           
             data.append('first_name', firstName);
             data.append('last_name', lastName );
             data.append('email', email );
           
             
             console.log(data);
             this.http.put(this.api+'user/'+id, data,'{ headers: header}').subscribe((res: Response) => {
              console.log(res);
              console.log(this.users)
                console.log(res.json().data.result)
                this.users.push(res.json().data.result);
                console.log(this.users)
              
              if (res.json().data.responseCode == 200) {
                this.common.successNotify('Success','User Edited successfully')
                this.modalRef.hide();
                this.ngOnInit();  
             } else {
              this.common.successNotify('Success',res.json().data.error)

  
             }
             
        });

  }
  

  
  
  
  
  delete(user){
    console.log(user)
    this.userlistservice.deleteList(user.id).subscribe(data => {
    this.users.splice(this.users.indexOf(user),1);
     console.log(data)
    });

  }
  edit(id){
    this.http.get(this.api+'user/'+id).subscribe((res: Response) => {
       console.log(res);
      this.model.firstNameE = res.json().data.result.first_name;
      this.model.lastNameE = res.json().data.result.last_name;
      this.model.userName = res.json().data.result.user_name;
      this.model.emailE = res.json().data.result.email;
      this.model.password = res.json().data.result.password;
      this.model.id= res.json().data.result.user;

  });
}



  manageNurturePath(){
    const ids = +this.route.snapshot.paramMap.get('id');
                 console.log(ids);
   this.router.navigate(['/manage-nurture',ids]);
  
  }



  onKey() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    this.http.post(this.api+'checkemail', { email: this.model.email },'{headers: headers}' ).subscribe((res: Response)=>{
  this.email_error = res.json().data.result;
     if(this.email_error == true){
        this.email_msg = 'Email is already exist';
        this.red = true;
        this.green = false;
     }else{
      this.email_msg = '';
      
     }
    });
    }




    idSet(user) {
      this.delete_id = user;
  }
  deleteUser(user){
    this.userlistservice.deleteList(user.user).subscribe(data => {
      this.users.splice(this.users.indexOf(user),1);
       console.log(data.json().data.responseCode)
       this.modalRef.hide();
       if (data.json().data.responseCode == 200 ) {
         this.common.successNotify('Success',data.json().data.result)
       } else {
        this.common.errorNotify('Error',data.json().data.result)  
       }
      });
      
  }

}


