import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';

@Component({
  selector: 'app-more-comments',
  templateUrl: './more-comments.component.html',
  styleUrls: ['./more-comments.component.css']
})
export class MoreCommentsComponent implements OnInit {
  data: any;
  Id:any;
  employeeId=6;
  commentList:any;
  constructor(private awardService:AwardService, private route:ActivatedRoute) { }
  Comments :any ={
    id :  0,
    comments : '',
    employeeId : 0,
    awardId : 0,
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((result) => {
          this.data = result;
        });
      });

      this.awardService.getComments(this.Id).subscribe(result=>{
        this.commentList=result;
        console.log(this.commentList);
      })
  }
  OnSubmit(){
    console.log(this.Comments);
    this.Comments.employeeId=this.employeeId;
    this.Comments.awardId=this.Id;
    this.awardService.addComment(this.Comments).subscribe(data=>{
      console.log(data);
      
      setTimeout(()=> { this.ngOnInit()}, 1000)
      this.Comments='';
      
    });
  }

}
