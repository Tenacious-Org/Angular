import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-yettopublish',
  templateUrl: './hr-yettopublish.component.html',
  styleUrls: ['./hr-yettopublish.component.css']
})
export class HrYettopublishComponent implements OnInit {
  employeeId=AuthenticationService.GetData("User");
  data: any;
   Id:any;
   couponCode:any;
   publishedId=4;
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
    private route:ActivatedRoute,private toastService: HotToastService,private router:Router) { }
  ngOnInit(): void {
    if(!AuthenticationService.GetData("Publisher")){
      this.router.navigateByUrl("")
    }
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
            console.log(this.Id)
            console.log(this.data.couponCode);
        });
      });
  }
  OnSubmit(){
    console.log(this.data);
    this.awards.couponCode=this.data.couponCode;
    this.awards.statusId=this.publishedId;
    this.awardService.approval(this.awards,this.employeeId).subscribe(data=>{
      console.log(data);
      this.showToast();
    });
  }
  showToast() {
    this.toastService.success('Published Successfully!',
    {
      autoClose: true,
      dismissible: true,
    })
    this.router.navigate(['/hr-publish']);
  }


}
