import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data :any;
  id:any;
  endpoint="Employee";

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {
    // this.router.params.subscribe(params => {
    //   this.Id = params['id'];
    // this.http
    //   .get<any>(`https://localhost:7275/api/Employee/GetById?id=${this.Id}`)
    //   .subscribe((data) => {
    //     this.data = data;
    //     console.log(this.Id)
    //     console.log(data);
    //   });
    // });
    this.id=AuthenticationService.GetData("User");
    this.sharedService.getById(this.endpoint,this.id)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }

}
