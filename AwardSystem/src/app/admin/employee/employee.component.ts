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
  searchValue = '';
  public filteredData: any[] = [];
  employeename: any;


  constructor(private sharedService: SharedService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }
    this.sharedService
      .GetAll(this.endpoint).subscribe((data) => {
        this.data = data;
        this.filteredData = data;
        this.totalLength = data.length;

      });
  }
  Disable(Id: any) {
    this.sharedService.GetById(this.endpoint, Id).subscribe((data) => {
      this.employeename = data.firstName + " " + data.lastName;
      this.sharedService.Disable(this.endpoint, Id).subscribe((result) => {
        this.openDialog(result);
        this.ngOnInit()
      });
    });
  }
  openDialog(count: any) {

    this.dialog.open(DialogboxComponent, { data: { name: this.employeename, count: count, value: "Employee" } });

  }


  public data: Employee[] = [];
  dialogDisable(id: any) {
    let dialogRef = this.dialog.open(DialogboxComponent, { data: { value: "disable" } })
    dialogRef.afterClosed().subscribe(value => {
      if (value != undefined) {
        this.Disable(id);
      }
    });
  }
  Search(value: string) {
    this.data = this.filteredData.filter(item =>
      item.awardeeName.toLowerCase().includes(value.toLowerCase()) || item.firstName.toLowerCase().includes(value.toLowerCase()))
    this.page = 1;
  }




}
