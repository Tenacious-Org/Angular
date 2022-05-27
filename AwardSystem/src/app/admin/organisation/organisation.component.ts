import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
   endpoints="Organisation";
   totalLength: any;
   page: number = 1;
   val:any;
   constructor(private sharedService:SharedService ) { }

   ngOnInit(): void {
    this.sharedService.getAll(this.endpoints).subscribe(data=>{
      this.data=data;
      this.totalLength=data;
    });
    
   }
   public data: Organisation[] = [];

}
