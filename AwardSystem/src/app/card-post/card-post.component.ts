import { Component, OnInit } from '@angular/core';
import { AwardService } from '../award.service';
import { Comments } from 'Models/Comments';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent implements OnInit {
  AwardId:any;
  commentList:any;
  pageId=0;
  employeeId=6;
  Comments :any ={
    id :  0,
    comments : '',
    employeeId : 0,
    awardId : 0,
  }
  awardData: any;
  totalLength: any;
  page: number = 1;

  constructor(private awardService:AwardService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.AwardId = params['id'];
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>{
      this.awardData=data;
    });
  });

    this.awardService.getComments(this.AwardId).subscribe(result=>{
      this.commentList=result;
      console.log(this.commentList);
    })
  }
  OnSubmit(){ 
    console.log(this.Comments)
    console.log(this.awardData.id)
    this.Comments.awardId=this.AwardId;
    this.Comments.employeeId=this.employeeId;
    this.awardService.addComment(this.Comments).subscribe((res) =>{
      console.log(res);
    });
  }

  // ngOnInit(): void {
  //   this.awardService.getAll(this.Comments).subscribe(data=>{
  //     this.data=data;
  //   });

}
