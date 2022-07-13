import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { AwardService } from '../award.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-more-comments',
  templateUrl: './more-comments.component.html',
  styleUrls: ['./more-comments.component.css'],
  providers:[DatePipe]
})
export class MoreCommentsComponent implements OnInit {
  data: any;

  Id: any;
  employeeId = AuthenticationService.GetData('User');
  commentList: any;
  isReadMore = true;
  isAuthorize: any;
  constructor(private awardService: AwardService, private route: ActivatedRoute, private routing: Router) { }
  Comments: any = {
    id: 0,
    comments: '',
    employeeId: 0,
    awardId: 0,
  }
  dateTime:Date | undefined
  

  ngOnInit(): void {
    this.isAuthorize = AuthenticationService.GetData("token")
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.awardService.getAwardById(this.Id).subscribe((result) => {
        this.data = result;
        console.log(this.data);
      });
    });
      this.awardService.getComments(this.Id).subscribe(result=>{
        this.commentList=result;
        console.log(this.commentList);
      })
     timer(0,1000).subscribe(()=>{
      this.dateTime=new Date();
     })
  }
  OnSubmit() {
    if (AuthenticationService.GetData("token") == null) this.routing.navigateByUrl("/login")
    console.log(this.Comments);
    this.Comments.employeeId = this.employeeId;
    this.Comments.awardId = this.Id;
    this.awardService.addComment(this.Comments).subscribe(data => {
      console.log(data);
      this.ngOnInit()
      this.Comments.comments = ''
    });
  }

}
