import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {
  error: any = '';

  endpoint = "Organisation";
  constructor(private sharedService: SharedService, private location: Location, private router: Router, private toastService: HotToastService, private dialog: MatDialog) { }
  Organisation: any = {
    id: 0,
    organisationName: '',
    addedBy: 1,
    addedOn: Date.now,


  }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }

  }

  OnSubmit() {
    this.sharedService.Add(this.endpoint, this.Organisation).subscribe({
      // this.showToast();
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    })

  }
  showToast() {
    this.toastService.success('Organisation added Successfully!',
      {
        autoClose: true,
        dismissible: true,
      })
    this.router.navigate(['/admin/organisation']);

  }


}


