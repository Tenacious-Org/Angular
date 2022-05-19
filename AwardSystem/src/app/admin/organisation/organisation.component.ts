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
 
   constructor(private sharedService:SharedService ) { }

   ngOnInit(): void {
    this.sharedService.getAllOrganisation().subscribe(data=>{
      this.data=data;
    });
    
   }
   public data: Organisation[] = [];

}
