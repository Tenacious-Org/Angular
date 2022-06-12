import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  AwardId:any;
  awardData: any;
  totalLength: any;
  page: number = 1;
  pageId=0;
  employeeId=6;
  constructor(private awardService:AwardService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.AwardId = params['id'];
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>{
      this.awardData=data;
    });
  });

  
  }

}
