import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { AwardService } from '../award.service';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-more-comments',
  templateUrl: './more-comments.component.html',
  styleUrls: ['./more-comments.component.css']
})
export class MoreCommentsComponent implements OnInit {
  data: any;
  Id: any;
  employeeId = AuthenticationService.GetData('User');
  commentList: any;
  isReadMore = true;
  isAuthorize: any;
  constructor(private awardService: AwardService, private route: ActivatedRoute, private routing: Router, private dialog: MatDialog, private toastService: HotToastService) { }
  Comments: any = {
    id: 0,
    comments: '',
    employeeId: 0,
    awardId: 0,
  }

  ngOnInit(): void {
    this.isAuthorize = AuthenticationService.GetData("token")
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.awardService.GetAwardById(this.Id).subscribe((result) => {
        this.data = result;
      });
    });



    this.awardService.GetComments(this.Id).subscribe(result => {
      this.commentList = result;
    })

  }
  OnSubmit() {

    this.Comments.employeeId = this.employeeId;
    this.Comments.awardId = this.Id;
    this.awardService.AddComment(this.Comments).subscribe(data => {
      this.ngOnInit()
      this.Comments.comments = ''
    });
  }
  LogintoComment() {
    if (AuthenticationService.GetData("token") == null)
      this.dialog.open(DialogboxComponent, { data: { value: "notValid" } });
  }



}
