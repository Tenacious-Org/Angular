import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  pageId :any;
  totalLength: any;
  page: number = 1;
  data: any;
  val: any;
  filtervalue: any;
  // filtervalue:any;
  // endpoint ='status';
  // statusList: any;
  // changestatus(e:any){
  //   console.log(e.target.value)
  // }

  constructor(private awardService: AwardService,private sharedService:SharedService,private router:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Requester") && !AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")){
      this.router.navigateByUrl("")
    }
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['id'];
    });
    console.log(this.pageId)
    this.getAll(this.pageId);

  // getAllStatus(endpoint:any){
  //   this.sharedService.getAll(endpoint).subscribe((data)=>{
  //     this.status=data;
  //   })
  // }
  // this.sharedService.getAll(this.endpoint).subscribe((data:any)=>{
  //   this.statusList =  data;
  // })

  }
  onSubmit() {
    if (this.filtervalue == '') {
      this.getAll(this.pageId);
    }
  }
  
  getAll(pageId:any) {
    this.awardService
      .getAwardsList(pageId)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }
}
