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
  constructor(private awardService:AwardService ) { }
  

  ngOnInit(): void {
    this.awardService.getAwards(this.pageId,this.employeeId).subscribe(data=>
    {
        this.data = data;
    });
  }
  
  public data: Awards[] = [];
}



