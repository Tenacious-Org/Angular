import{HttpClientModule} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Employee} from 'Models/Employee';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-requester-add-request',
  templateUrl: './requester-add-request.component.html',
  styleUrls: ['./requester-add-request.component.css']
})
export class RequesterAddRequestComponent implements OnInit {

  endpoint="Employee";
  id=6;
  //data:string[]=['Ajay','Jeeva']
  constructor(private sharedService:SharedService,private http:HttpClientModule) { }

  ngOnInit(): void {
    this.sharedService.getEmployeeByRequester(this.id).subscribe(data=>{
     this.data=data;
    });
  }

  public data:Employee[]=[];

}
