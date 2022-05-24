import{HttpClient} from '@angular/common/http';
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
  id: any;
  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.getEmployeeByRequester(this.id).subscribe(data=>{
      this.data=data;
    });
  }
  public data:Employee[]=[];

}
