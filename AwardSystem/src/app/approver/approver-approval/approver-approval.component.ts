import { Component, OnInit } from '@angular/core';
import { Awards } from 'Models/Awards';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-approval',
  templateUrl: './approver-approval.component.html',
  styleUrls: ['./approver-approval.component.css']
})
export class ApproverApprovalComponent implements OnInit {
  pageId=3;
  employeeId=AuthenticationService.GetData("User");
  totalLength: any;
  page: number = 1;
  data:any;
  val:any;
  status : any;
  showstatus :any[] = [];
  options:string[]=["All","Pending","Approved","Rejected","Published"]
  filtervalue = "All";
  
  constructor(private awardService:AwardService,private router:Router) { }


  ngOnInit(): void {
    if(!AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")){
      this.router.navigateByUrl("")
    }
    this.getAll();
  }
onSubmit(){
  if(this.filtervalue==""){
    this.getAll();

  }
}
 getAll(){
  this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>
    {
        this.data = data;
        this.totalLength=data;
        console.log(this.data)
    });

 }

}
