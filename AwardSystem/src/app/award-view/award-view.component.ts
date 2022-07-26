import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AwardService } from 'src/app/award.service';
import { Awards } from 'Models/Awards';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
import { RejectionReasonComponent } from '../approver/rejection-reason/rejection-reason.component';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-award-view',
  templateUrl: './award-view.component.html',
  styleUrls: ['./award-view.component.css']
})
export class AwardViewComponent implements OnInit {

  awards: any = {
    id: 0,
    requesterId: 0,
    awardeeId: 0,
    awardTypeId: 0,
    approverId: 0,
    reason: '',
    rejectReason: '',
    hRId: 0,
    couponCode: '',
    statusId: 0,
    addedBy: 0,
    addedOn: Date.now,
    updatedBy: 0,
    updatedOn: Date.now,
    isActive: true,
  }
  data: any;
  Id: any;
  Reason: any;
  approvedId = 2;
  rejectedId = 3;
  publishedId = 4;
  response = "success";
  error: any;
  show: number = 1;
  pageId: any;

  constructor(private awardService: AwardService,
    private activatedRoute: ActivatedRoute, private dialog: MatDialog, private toastService: HotToastService, private router: Router) { }
  ngOnInit(): void {
    if (!AuthenticationService.GetData("Requester") && !AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    this.activatedRoute.params.subscribe(params => {
      this.Id = params['id1'];
      this.pageId = params['id']
      this.awardService.GetAwardById(this.Id).subscribe((result) => {
        this.data = result;
        this.awards.id = this.data.id;
        this.awards.requesterId = this.data.requesterId;
        this.awards.awardeeId = this.data.awardeeId;
        this.awards.awardTypeId = this.data.awardTypeId;
        this.awards.approverId = this.data.approverId;
        this.awards.reason = this.data.reason;
        this.awards.publisherId = this.data.publisherId;
        this.awards.addedBy = this.data.addedBy;
        this.awards.addedOn = this.data.addedOn;
      });
    });
  }
  OnAccept() {
    if (!AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    this.awards.statusId = this.approvedId;
    this.awardService.Approval(this.awards).subscribe(data => {
      this.acceptedToast();
    });
  }
  OnReject() {
    if (!AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    let dialogRef = this.dialog.open(RejectionReasonComponent, { data: { reason: this.Reason } });
    dialogRef.afterClosed().subscribe(value => {
      this.awards.rejectedReason = value;
      if (value != undefined) {
        this.awards.statusId = this.rejectedId;
        this.awardService.Approval(this.awards).subscribe(data => {
          this.rejectedToast();
        });
      }
    });
  }
  onPublish() {
    if (!AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    let dialogRef = this.dialog.open(DialogboxComponent, { data: { value: "publish" } })
    dialogRef.afterClosed().subscribe(value => {
      if (value != undefined) {
        this.awards.couponCode = this.data.couponCode;
        this.awards.statusId = this.publishedId;
        this.awardService.Approval(this.awards).subscribe({
          next: (res) => { res ? this.publishedToast() : null },
          error: (error) => this.error = error.error.message
        });
      }
    });
  }
  publishedToast() {
    this.toastService.success('Published Successfully!',
      {
        autoClose: true,
        dismissible: true,
      })
    this.router.navigate(['/awardlist/4']);
  }
  acceptedToast() {
    this.toastService.success('Request Approved!',
      {
        autoClose: true,
        dismissible: true,
      })
    this.router.navigate(['/awardlist/3']);
  }
  rejectedToast() {
    this.toastService.success('Request Rejected!',
      {
        autoClose: true,
        dismissible: true,
        icon: '❎',
      })
    this.router.navigate(['/awardlist/3']);
  }
  reason() {
    this.show = 1;
  }
  rejectionreason() {
    this.show = 2;
  }
  about() {
    this.show = 3;
  }
  htmlString = '<h1>Hello gowtham</h1>';
}
