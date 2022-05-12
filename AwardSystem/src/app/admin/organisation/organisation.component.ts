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

  @Input() orgsrc: string ="https://localhost:7275/api/Organisation/GetAll";
   totalLength: any;
   page: number = 1;
   
  @Input() org:any;
   
 
   constructor(private sharedService:SharedService ) { }
   


   ngOnInit(): void {
    //  this.sharedService
    //    .get<any>(this.orgsrc)
    //    .subscribe((data) => {
    //      this.data = data;
    //      this.totalLength = data.length;
    //      console.log(data)
    //    });
    
  
    this.sharedService.getAllOrganisation().subscribe(data=>{
      this.data=data;
    });
    
   }



 
   public data: Organisation[] = [];

}
