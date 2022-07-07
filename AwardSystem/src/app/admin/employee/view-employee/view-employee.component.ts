import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  data :any;
  Id=0;
  endpoint="Employee";

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute,private routing:Router) { }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.routing.navigateByUrl("")
    }
    this.router.params.subscribe(params => {
      this.Id = params['id'];
    this.sharedService.getById(this.endpoint,this.Id)
      .subscribe((data) => {
        this.data = data;
        console.log(this.Id)
        console.log(data);
      });
    });
  }
}
