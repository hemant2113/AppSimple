import {
    Component,
    OnInit
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import {
    HttpHeaders
} from '@angular/common/http';
import {
    Router
} from '@angular/router';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  form;
  company_name:string = "";
    company_url:string = "fg";
    sessionItem:any;
    constructor(private http: Http, private router: Router) {}
    
   
    ngOnInit() {
    
        this.company_url ="";
      
    }
    addCompany(e) {
        e.preventDefault();
        var company_name = e.target.elements[0].value;
        var company_url = e.target.elements[1].value;
        console.log(company_name);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        if (company_name == '') {
            alert('company name is empty');
            return false;
        }
        if (company_url == '') {
            alert('company url is empty');
            return false;
        }

        this.http.post('http://18.218.9.135:8888/company', {
            name: company_name,
            url: company_url
        }, '{headers: headers;}').subscribe((res: Response) => {
            this.router.navigate(['/dashboard'])
        });




    }



    editCompany(e) {
        e.preventDefault();
        var company_name = e.target.elements[0].value;
        var company_url = e.target.elements[1].value

    }


    logout_user() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}
