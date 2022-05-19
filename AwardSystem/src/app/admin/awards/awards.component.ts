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
  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
  
   this.sharedService.getAll(this.endpoints).subscribe(data=>{
   this.data=data;
   

   });
   
  }
 

  public data: AwardType[] = [];
}
