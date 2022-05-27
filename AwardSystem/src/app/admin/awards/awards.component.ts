import { Component, Input, OnInit } from '@angular/core';
import { AwardType } from 'Models/AwardType';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  endpoints ="AwardType";
  totalLength: any;
  page: number = 1;
  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
  
   this.sharedService.getAll(this.endpoints).subscribe(data=>{
   this.data=data;
   this.totalLength=data;
   console.log(this.data);
   });
   
  }
 

  public data: AwardType[] = [];
}
