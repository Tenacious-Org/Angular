import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data :any| undefined;
  id:any;
  endpoint="Employee";
  role: any;

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.role=AuthenticationService.GetData("Role");

    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    //this.id=AuthenticationService.GetData("User");
    this.sharedService.getById(this.endpoint,this.id)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
        
      });
  }

}
