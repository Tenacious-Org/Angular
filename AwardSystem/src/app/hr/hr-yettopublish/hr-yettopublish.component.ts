import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-hr-yettopublish',
  templateUrl: './hr-yettopublish.component.html',
  styleUrls: ['./hr-yettopublish.component.css']
})
export class HrYettopublishComponent implements OnInit {

  data: any;
   Id:any;
   couponCode:any;
   publishedId=4;
  
  

  constructor(private awardService:AwardService,
    private route:ActivatedRoute,) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((data) => {
            this.data = data;
            console.log(this.Id)
            console.log(data);
            console.log(this.data.couponCode);
        });
      });
  }
  OnSubmit(){
    console.log(this.data);
    this.data.statusId=this.publishedId;
    this.awardService.approval(this.data).subscribe(data=>{
      console.log(data);
    });
  }

}
