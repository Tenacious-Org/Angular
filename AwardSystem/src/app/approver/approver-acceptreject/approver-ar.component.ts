import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RejectionReasonComponent } from '../rejection-reason/rejection-reason.component';
import { AwardService } from 'src/app/award.service';
import { Awards } from 'Models/Awards';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-approver-ar',
  templateUrl: './approver-ar.component.html',
  styleUrls: ['./approver-ar.component.css']
})
export class ApproverARComponent implements OnInit {
   data: any;
   Id:any;
   Reason :any;
   employeeId=AuthenticationService.GetData("User");
   approvedId=2;
   rejectedId=3;

   response="success";
   awards:any={
    id :0,
    requesterId : 0,
    awardeeId : 0,
    awardTypeId : 0,
    approverId : 0,
    reason : '',
    rejectReason : '',
    hRId : 0,
    couponCode : '',
    statusId :0,
    addedBy :0,
    addedOn :Date.now,
    updatedBy : 0,
    updatedOn : Date.now,
    isActive : true,
   }
  constructor(private awardService:AwardService,
    private route:ActivatedRoute,private dialog: MatDialog,private toastService: HotToastService,private router:Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((result) => {
          this.data = result;
          this.awards.id  = this.data.id;
          this.awards.requesterId  = this.data.requesterId;
          this.awards.awardeeId  = this.data.awardeeId;
          this.awards.awardTypeId  = this.data.awardTypeId;
          this.awards.approverId  = this.data.approverId;
          this.awards.reason  = this.data.reason;
          this.awards.hRId  = this.data.hRId;
          this.awards.addedBy=this.data.addedBy;
          this.awards.addedOn=this.data.addedOn;
          console.log(this.data.statusId);
          console.log(this.data.rejectedReason);
          console.log(this.data);

        });
      });
  }
  OnSubmit(){
    console.log(this.awards);
    this.awards.statusId=this.approvedId;
    this.awardService.approval(this.awards,this.employeeId).subscribe(data=>{
      console.log(res);
      this.showToast();

    });
  }
  showToast() {
    this.toastService.success('Request Accepted!',
    {
      autoClose: true,
      dismissible: true,
      icon: '❎',
    })
    this.router.navigate(['/approver-approval']);
  }

  openDialog(){
    let dialogRef = this.dialog.open(RejectionReasonComponent,{data:{reason:this.Reason}});
    dialogRef.afterClosed().subscribe(value => {
      this.awards.rejectedReason=value;
      if(value!=undefined){
        this.awards.statusId=this.rejectedId;
        this.awardService.approval(this.awards,this.employeeId).subscribe(data=>{
          console.log(this.awards);
        });
      }

    });

  }

  }
function res(res: any) {
  throw new Error('Function not implemented.');
}

