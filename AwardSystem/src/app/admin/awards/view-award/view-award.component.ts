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

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.Id = params['id'];
    this.http
      .get<any>(`https://localhost:7275/api/AwardType/GetById?id=${this.Id}`)
      .subscribe((data) => {
        this.data = data;
        console.log(this.Id)
        console.log(data);
      });
    });
  }

}
