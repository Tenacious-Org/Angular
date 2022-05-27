import { Component, OnInit } from '@angular/core';
import { AwardService } from '../award.service';
import { Comments } from 'Models/Comments';
@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent implements OnInit {
  
  Comments :any ={
    id :  0,
    comments : '',
    employeeId : 0,
    awardId : 0,
  }
  data: any;
  totalLength: any;
  page: number = 1;

  constructor(private awardService:AwardService) { }

  ngOnInit(): void {
  }
  OnSubmit(){
    console.log(this.Comments)
    this.awardService.addComment(this.Comments).subscribe((res) =>{
      console.log(res);
    });
  }

  // ngOnInit(): void {
  //   this.awardService.getAll(this.Comments).subscribe(data=>{
  //     this.data=data;
  //   });

}
