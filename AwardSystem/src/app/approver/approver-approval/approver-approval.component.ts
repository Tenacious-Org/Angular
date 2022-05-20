import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';  
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-approver-approval',
  templateUrl: './approver-approval.component.html',
  styleUrls: ['./approver-approval.component.css']
})
export class ApproverApprovalComponent implements OnInit {
  
  
  constructor(private sharedService:SharedService ) { }

  id = 5;

  ngOnInit(): void {
    this.sharedService.getRequestedAwardList(this.id).subscribe(data=>
    {
        this.data = data;
    });
  }
  
  public data: Awards[] = [];
}
