import { Component, OnInit } from '@angular/core';
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  pageId=2;
  employeeId=6;
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
