import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
   endpoint="Organisation";
   totalLength: any;
   page: number = 1;
   val:any;
   constructor(private sharedService:SharedService ) { }

   ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.data=data;
      this.totalLength=data;
      console.log(this.data)
    });

   }
   Disable(Id:any){
    console.log(Id);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      this.data = result;
      console.log(this.data);

      });
  }
   public data: Organisation[] = [];

}
