import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})

export class AwardsComponent implements OnInit {
  endpoint="AwardType";
  totalLength: any;
  page: number = 1;
  val:any;
  data:any;

  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {

   this.sharedService.getAll(this.endpoint).subscribe(data=>{
   this.data=data;
   this.totalLength=data;
   console.log(this.data);
   });

  }

  Disable(Id:any){
    console.log(Id);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      this.data = result;
      console.log(this.data);

      });
  }

}
