import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApproveService } from '../approve.service';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rejection-reason',
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent implements OnInit {
  data: any;

  Id =  1;
    RequesterId = 6;
    AwardeeId = 7;
    AwardTypeId = 1;
    ApproverId = 5;
    Reason =  "Best performer in team";
    RejectReason = '';
    HRId =  4;
    CouponCode =  '';
    StatusId = 2;
    IsActive =  true;

  constructor(private location: Location,private approveService:ApproveService,
    private sharedService:SharedService,private route:ActivatedRoute,) { }

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
    this.approveService.reject(this.Id,this.data).subscribe(data=>{
      console.log(data);
    });
  }
  goBack() {
    // window.history.back();
    this.location.back();
    console.log( 'goBack()...' );
  }

}
