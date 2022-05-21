import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

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

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }
  OnSubmit(){
    console.log(this.Comments)
    this.sharedService.addComment(this.Comments).subscribe((res) =>{
      console.log(res);
    });
  }

}
