import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-view-award',
  templateUrl: './view-award.component.html',
  styleUrls: ['./view-award.component.css']
})
export class ViewAwardComponent implements OnInit {
  data :any;
  Id=0;
  endpoint="AwardType"
  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.Id = params['id'];
    this.http
    this.sharedService.getById(this.endpoint,this.Id).subscribe((result) => {
      this.data = result;
        console.log(this.Id)
        console.log(this.data);
      });
    });
  }

}
