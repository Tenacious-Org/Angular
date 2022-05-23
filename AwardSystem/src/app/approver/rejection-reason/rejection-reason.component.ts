import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from 'src/app/award.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';


@Component({
  selector: 'app-rejection-reason',
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent implements OnInit {
  Id:any;
  



  constructor(private location: Location,private route:ActivatedRoute,private awardService:AwardService,public dialogRef: MatDialogRef<RejectionReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

  }
  ngOnInit(): void {
    
 
  }
 
  close() {
    this.dialogRef.close();
  }

}
