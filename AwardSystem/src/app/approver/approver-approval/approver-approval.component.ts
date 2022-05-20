import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';  
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-approver-approval',
  templateUrl: './approver-approval.component.html',
  styleUrls: ['./approver-approval.component.css']
})
export class ApproverApprovalComponent implements OnInit {
  
  endpoints="Awards";
  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
    this.sharedService.getRequestedAwardList(this.endpoints).subscribe(data=>{
      this.data=data;
    });
  }
  
  public data: Awards[] = [];
}
