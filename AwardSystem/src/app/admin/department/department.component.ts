import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  endpoint = "Department";
  endpoint1 = "Organisation";

  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
   this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.data = data;
      console.log(this.data);
    });
    console.log(this.data);
   this.sharedService.getAll(this.endpoint1).subscribe(data1=>{
      this.data1 = data1;
      console.log(this.data1);
    });

    
    
  }

  public data: Department[] = [];
  public data1: Organisation[] = [];
}
