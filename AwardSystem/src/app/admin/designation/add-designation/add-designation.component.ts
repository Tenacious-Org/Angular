import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { Department } from 'Models/Department';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  Id: any;
  roleID: any;
  departmentID: any;
  error: any;
  constructor(private sharedService: SharedService, private router: Router, private toastService: HotToastService, private dialog: MatDialog) { }
  Designation: any = {
    id: 0,
    designationName: '',
    departmentId: 0,
    roleId: 0,
    addedBy: 1,
    addedOn: Date.now

  }
  departments: Department[] = [];
  roles: any;
  selectOrg: any = 0;
  endpoint = "Department";
  endpoint1 = "Designation";
  endpoint2 = "Role";

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }
    this.sharedService.GetAll(this.endpoint).subscribe(data => {
      this.departments = data;
    });
    this.sharedService.GetAll(this.endpoint2).subscribe(data => {
      this.roles = data;
    });

  }

  OnSubmit() {
    this.sharedService.Add(this.endpoint1, this.Designation).subscribe({
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    });

  }
  showToast() {
    this.toastService.success('Designation added Successfully!',
      {
        autoClose: true,
        dismissible: true,
        icon: '❎',
      })
    this.router.navigate(['/designation']);


  }
  CheckName(DepartmentId: any, RoleId: any) {
    this.departmentID = DepartmentId;
    this.roleID = RoleId;
  }
}
