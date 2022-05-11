import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DepartmentService } from '../department.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private departmentService:DepartmentService) {}

  id = 0;
  departmentName = '';
  organisationId = 2;
  isActive = true;
  addedBy = 1;
  addedOn = Date();
  updatedBy = 1;
  updatedOn = Date();

  Department : any = {
    id : 0,
    departmentName : this.departmentName,
    organisationId : this.organisationId,
    isActive : this.isActive,
    addedBy : this.addedBy,
    addedOn : this.addedOn,
    updatedBy : this.updatedBy,
    updatedOn : this.updatedOn
  }

  ngOnInit(): void {
  }
  
  OnSubmit(){
    console.log(this.Department)
    this.departmentService.AddDepartment(this.Department).subscribe((res) =>{
      console.log(res);
    })
  }

}
