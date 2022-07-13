import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'Models/Employee';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  endpoint = "Employee";
  totalLength: any;
  page: number = 1;
  val: any;
  employeename: any;
  constructor(private sharedService: SharedService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }
    this.sharedService
      .getAll(this.endpoint).subscribe((data) => {
        this.data = data;
        this.totalLength = data.length;
        console.log(data)
      });
  }

  Disable(Id: any) {
    console.log(Id);
    this.sharedService.getById(this.endpoint, Id).subscribe((data) => {
      this.employeename = data.firstName + " " + data.lastName;
      console.log(this.employeename);
      this.sharedService.disable(this.endpoint, Id).subscribe((result) => {
        console.log(result);
        this.openDialog(result);
        this.ngOnInit()
      });
    });
  }

  openDialog(count: any) {

    this.dialog.open(DialogboxComponent, { data: { name: this.employeename, count: count, value: "Employee" } });
  }

  public data: Employee[] = [];
}
