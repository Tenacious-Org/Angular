import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { Department } from 'Models/Department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  constructor(private sharedService:SharedService,private router:Router) { }
  Designation : any = {
    id : 0,
    designationName : '',
    departmentId  : 0,
    roleId:0,
    addedBy : 1,
    addedOn : Date.now

  }
  departments : Department[]=[];
  roles:any;
  selectOrg:any=0;
  endpoint="Department";
  endpoint1="Designation";
  endpoint2="Role";

   ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.departments=data;
      console.log(this.departments);
    });
    this.sharedService.getAll(this.endpoint2).subscribe(data=>{
      this.roles=data;
      console.log(this.roles);
    });

   }

  OnSubmit(){
    this.sharedService.add(this.endpoint1,this.Designation).subscribe(data=>{
      console.log(data);
    });
    this.router.navigate(['/designation']);

  }

}
