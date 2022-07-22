import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Organisation } from 'Models/Organisation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  organisationName: any = '';
  error: any = '';
  Id: any;
  constructor(private toastService: HotToastService, private sharedService: SharedService, private router: Router) { }

  response = "success";
  Department: any = {
    id: 0,
    departmentName: '',
    organisationId: 0,
    addedBy: 1,
    addedOn: Date.now,
    updatedBy: 1,
    updatedOn: Date.now,
  }
  public data: Organisation[] = [];

  endpoint = "Department";
  endpoint1 = "Organisation";
  ngOnInit(): void {

    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }

    this.sharedService.GetAll(this.endpoint1).subscribe(data => {
      this.data = data;
    });
  }
  OnSubmit() {
    this.sharedService.Add(this.endpoint, this.Department).subscribe({
      // this.showToast();
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    });

  }
  showToast() {
    this.toastService.success('Department added Successfully !',
      {
        autoClose: true,
        dismissible: true,

      })
    this.router.navigate(['/admin/department']);
  }
  CheckName(OrganisationId: any) {
    this.Id = OrganisationId;
  }
}







