import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';
import { ApproveService } from '../approve.service';

@Component({
  selector: 'app-approver-ar',
  templateUrl: './approver-ar.component.html',
  styleUrls: ['./approver-ar.component.css']
})
export class ApproverARComponent implements OnInit {
   data: any;
 
    Id =  1;
    RequesterId = 6;
    AwardeeId = 7;
    AwardTypeId = 1;
    ApproverId = 5;
    Reason =  "Best performer in team";
    RejectReason = 4;
    HRId =  0;
    CouponCode =  '';
    StatusId = 2;
    IsActive =  true;
  

  constructor(private approveService:ApproveService) { }

  ngOnInit(): void {
  }
  OnSubmit(){
    console.log(this.data);
    this.approveService.approve(this.Id,this.data).subscribe(data=>{
      console.log(data);
    });
  }
}
