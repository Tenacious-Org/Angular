import { Component, OnInit } from '@angular/core';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  constructor(private sharedService:SharedService) { }
  Designation : any = {
    id : 0,
    designationName : '',
    departmentID : '',
    addedBy : 1,
    addedOn : Date.now
 
  }
  organsiations: Organisation[] = [];
  departments : Department[]=[];
  selectOrg:any=0;
  endpoint="Organisation";
  endpoint1="Designation";

   ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.organsiations=data;
      console.log(this.organsiations);
    });
    
   }
   onSelect(){
    this.sharedService.getDepartmentByOrganisation(this.selectOrg).subscribe(data=>{
      this.departments=data;
      console.log(this.departments);
    });
   }

  OnSubmit(){
    this.sharedService.add(this.endpoint1,this.Designation).subscribe(data=>{
      console.log(data);
    })
  }


}
