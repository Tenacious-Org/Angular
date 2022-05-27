import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'Models/Employee';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  endpoint="Employee";
  totalLength: any;
  page: number = 1;
  val:any;
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {  
      this.sharedService
        .getAll(this.endpoint).subscribe((data) => {
          this.data = data;
          this.totalLength = data.length;
          console.log(data)
         
        });
      }
        public data: Employee[] = [];

}
