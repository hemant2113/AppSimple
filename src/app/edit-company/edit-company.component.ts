import {
    Component,
    OnInit
} from '@angular/core';
import {
    Http,
    Response
    } from '@angular/http';
import {
    Router
} from '@angular/router';


@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
    sessionItem:any;
    constructor(private http: Http, private router: Router) {}

    ngOnInit() {
    


    }
    editComapny(e) {
        e.preventDefault();
        var company_name = e.target.elements[1].value;
        var company_url = e.target.elements[2].value;
        var id = e.target.elements[0].value;
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        console.log(id)
        this.http.put('http://18.218.9.135:8888/company/' + id, {
            name: company_name,
            url: company_url
        }, '{headers: headers}').subscribe((res: Response) => {
            console.log(res)
            this.router.navigate(['/dashboard']);
        });


    }


}
