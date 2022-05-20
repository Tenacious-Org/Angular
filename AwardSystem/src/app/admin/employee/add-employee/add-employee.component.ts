import { Component, OnInit } from '@angular/core';
import { Department } from 'Models/Department';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  Employee : any = {
    id : 0,
    aceid : '',
    firstName : '',
    lastName : '',
    email : '',
    dob : '',
    organisationId : 0,
    departmentId : 0,
    designationId : 0,
    reportingPersonId : 0,
    hrID : 0,
    password : '',
    isActive : true,
  }

  organisations: Organisation[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];

  SelectOrg: any = 0;
  SelectDep: any = 0;

  endpoint = "Organisation";
  endpoint1 = "Employee";

  ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.organisations=data;
      console.log(this.organisations);
    });
  }

  onSelectDep(){
    this.sharedService.getDepartmentByOrganisation(this.SelectOrg).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }

   onSelectDes(){
    this.sharedService.getDesignationByDepartment(this.SelectDep).subscribe(data=>{
      this.designations = data;
      console.log(this.designations);
    });
   }

   OnSubmit(){
    this.sharedService.add(this.endpoint1,this.Employee).subscribe(data=>{
      console.log(data);
    });
  }
  

}
