import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Organisation } from 'Models/Organisation';
import { DepartmentService } from '../department.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private departmentService:DepartmentService, private sharedService:SharedService) {}

  Department : any = {
    id :0,
    departmentName : '',
    organisationId :0,
    addedBy : 1,
    addedOn : Date.now
  }
  

  ngOnInit(): void {
    this.sharedService.getAllOrganisation().subscribe(data=>{
      this.data=data;
    });
    

  }
  public data: Organisation[] = [];
  OnSubmit(){
    console.log(this.Department)
    this.departmentService.AddDepartment(this.Department).subscribe((res) =>{
      console.log(res);
    })
  }

}
