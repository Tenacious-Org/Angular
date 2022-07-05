import { Component, OnInit } from '@angular/core';
import { AwardService } from 'src/app/award.service';
import { Awards } from 'Models/Awards';

@Component({
  selector: 'app-hr-publish',
  templateUrl: './hr-publish.component.html',
  styleUrls: ['./hr-publish.component.css']
})
export class HrPublishComponent implements OnInit {

  pageId=4;
  employeeId=4;
  totalLength: any;
  page: number = 1;
  data:any;
  filtervalue:any;
  val:any;
  constructor(private awardService:AwardService ) { }
  

  ngOnInit(): void {
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>
    {
        this.data = data;
        console.log(this.data.statusId)
        this.totalLength=data;
    });
  }
  

}



