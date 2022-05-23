import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RejectionReasonComponent } from '../rejection-reason/rejection-reason.component';
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-approver-ar',
  templateUrl: './approver-ar.component.html',
  styleUrls: ['./approver-ar.component.css']
})
export class ApproverARComponent implements OnInit {
   data: any;
   Id:any;
   Reason :any;
   approvedId=2;
   rejectedId=3;
  

  constructor(private awardService:AwardService,
    private route:ActivatedRoute,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.data.statusId);
          console.log(this.data.rejectedReason);
        });
      });
  }
  OnSubmit(){
    console.log(this.data);
    this.data.statusId=this.approvedId;
    this.awardService.approval(this.data).subscribe(data=>{
      console.log(data);
    });
  }
  openDialog(){
    let dialogRef = this.dialog.open(RejectionReasonComponent,{data:{reason:this.Reason}});
    dialogRef.afterClosed().subscribe(value => {
      this.data.rejectedReason=value;
      if(value!=undefined){
        this.data.statusId=this.rejectedId;
        this.awardService.approval(this.data).subscribe(data=>{
          console.log(this.data);
        });
      }
      
    });
    
  }

  }