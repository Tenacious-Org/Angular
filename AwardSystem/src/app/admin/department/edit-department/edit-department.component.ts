import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  Id: any = 0;
  data: any;
  selectedOrganisation: any;
  OrganisationId: any;
  error: any='';
  constructor(private sharedService: SharedService, private router: ActivatedRoute, private routing: Router, private toastService: HotToastService) { }
  endpoint = "Department";
  endpoint1 = "Organisation";
  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.routing.navigateByUrl("")
    }


    this.router.params.subscribe(params => {
      this.Id = params['id'];
      this.sharedService.GetById(this.endpoint, this.Id).subscribe((result) => {
        this.data = result;
        this.selectedOrganisation = this.data.organisationId;
      });
    });
    this.sharedService.GetAll(this.endpoint1).subscribe(data => {
      this.organisation = data;
    });


  }
  public organisation: Organisation[] = [];

  OnSubmit() {
    this.sharedService.Edit(this.endpoint, this.data).subscribe({
      // this.showToast();
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    });
  }
  showToast() {
    this.toastService.success('Department updated Successfully!',
      {
        autoClose: true,
        dismissible: true,
      })
    this.routing.navigate(['/admin/department']);

  }
  CheckName(organisationId: any) {
    this.OrganisationId = organisationId;
  }
}
