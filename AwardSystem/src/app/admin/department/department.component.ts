import { Component, Input, OnInit } from '@angular/core';
import { DepartmentVM } from 'ViewModels/DepartmentsVM';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  totalLength: any;
  page: number = 1;
  endpoint = "Department";

  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
   this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.data = data;
      this.totalLength=data;
      console.log(this.data);
    });
    
   
  }

  public data: DepartmentVM[] = [];
}
