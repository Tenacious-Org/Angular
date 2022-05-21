import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';
import { ApproveService } from '../approve.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RejectionReasonComponent } from '../rejection-reason/rejection-reason.component';

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
    RejectReason = '';
    HRId =  0;
    CouponCode =  '';
    StatusId = 2;
    IsActive =  true;
  

  constructor(private approveService:ApproveService, private sharedService:SharedService,
    private route:ActivatedRoute, private location: Location,private dialogRef : MatDialog) { }
  endpoint="Award";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.sharedService.getById(this.endpoint,this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.Id);
          console.log(this.data);
        });
      });
  }
  OnSubmit(){
    console.log(this.data);
    this.approveService.approve(this.Id,this.data).subscribe(data=>{
      console.log(data);
    });
  }
  openDialog(){
    this.dialogRef.open(RejectionReasonComponent);
  }
  reject(){
    console.log(this.data);
    this.approveService.reject(this.Id,this.data).subscribe(data=>{
      console.log(data);
    });
  }
}
