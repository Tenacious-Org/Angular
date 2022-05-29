import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';  
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-approver-approval',
  templateUrl: './approver-approval.component.html',
  styleUrls: ['./approver-approval.component.css']
})
export class ApproverApprovalComponent implements OnInit {
  pageId=3;
  employeeId=5;
  totalLength: any;
  page: number = 1;
  data:any;
  constructor(private awardService:AwardService ) { }
  

  ngOnInit(): void {
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>
    {
        this.data = data;
        this.totalLength=data;
        console.log(this.data)
    });
  }
  
  
}
