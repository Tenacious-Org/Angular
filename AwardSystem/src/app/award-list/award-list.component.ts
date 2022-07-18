import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})
export class AwardListComponent implements OnInit {
  pageId :any;
  totalLength: any;
  page: number = 1;
  data: any;
  val: any;
  vale: any;
  options:string[]=["All","Pending","Approved","Rejected","Published"]
  filtervalue = "All";
  constructor(private awardService: AwardService,private router:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Requester") && !AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")){
      this.router.navigateByUrl("")
    }
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['id'];
    });
    console.log(this.pageId)
    this.getAll(this.pageId);
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
