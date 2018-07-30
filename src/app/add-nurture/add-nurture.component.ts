import { Component, OnInit } from '@angular/core';
import { NurtureService } from '../services/nurture.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-add-nurture',
  templateUrl: './add-nurture.component.html',
  styleUrls: ['./add-nurture.component.css']
})
export class AddNurtureComponent implements OnInit {
  sessionItem:any;
  constructor(public nurture_service: NurtureService, private router: Router) { 
    
  }

  ngOnInit() {

  }
  addNurture(e){
    e.preventDefault();
        var nurture_name = e.target.elements[0].value;
        var nurture_desc= e.target.elements[1].value;
        // console.log(nurture_name,nurture_desc)
        // this.nurture_service.addNurture(nurture_name,nurture_desc).subscribe(data => {
        //   console.log(data)
        //   this.router.navigate(['nurture']);
         
        // });
        
  }
  

  

}
