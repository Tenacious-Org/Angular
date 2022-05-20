import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Organisation } from 'Models/Organisation';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor( private sharedService:SharedService) {}

  Department : any = {
    id :0,
    departmentName : '',
    organisationId :0,
    addedBy : 1,
    addedOn : Date.now ,
    updatedBy : 1,
    updatedOn : Date.now, 
  }
  
endpoint="Department";
endpoint1="Organisation";
  ngOnInit(): void {
    this.sharedService.getAll(this.endpoint1).subscribe(data=>{
      this.data=data;
    });
    

  }
  public data: Organisation[] = [];
  OnSubmit(){
    console.log(this.Department)
    this.sharedService.add(this.endpoint,this.Department).subscribe((res) =>{
      console.log(res);
    });
  }

}
