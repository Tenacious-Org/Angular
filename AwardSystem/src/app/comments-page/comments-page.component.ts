import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { AwardService } from '../award.service';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit {

  data: any;
  Id:any;
  employeeId=AuthenticationService.GetData('User');
  commentList:any;
  isReadMore =true;
  isAuthorize:any;
  

  isClicked=false;
  constructor(private awardService:AwardService, private route:ActivatedRoute,private routing:Router, private dialog: MatDialog,private toastService: HotToastService) { }
  Comments :any ={
    id :  0,
    comments : '',
    employeeId : 0,
    awardId : 0,
  }
  
  ngOnInit(): void {
    this.isAuthorize=AuthenticationService.GetData("token") 
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.data);
        });
      });
    


      this.awardService.getComments(this.Id).subscribe(result=>{
        this.commentList=result;
        console.log(this.commentList.commentedOn);
      })

  }
  onViewComment(){
    this.isClicked=!this.isClicked;
    console.log(this.isClicked)
  }
  OnSubmit(){
  
    console.log(this.Comments);
    this.Comments.employeeId=this.employeeId;
    this.Comments.awardId=this.Id;
    this.awardService.addComment(this.Comments).subscribe(data=>{
      console.log(data);
      this.ngOnInit()
      this.Comments.comments=''
    });
  }
  LogintoComment(){
    if (AuthenticationService.GetData("token") == null)
       this.dialog.open(DialogboxComponent,{data:{value:"notValid"}});
  }

  
  
}
