import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardService } from 'src/app/award.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-rejection-reason',
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RejectionReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {

  }
  ngOnInit(): void {
    if (!AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }


  }


  close() {
    this.dialogRef.close();

  }

}
