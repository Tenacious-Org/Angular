import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-requester-view',
  templateUrl: './requester-view.component.html',
  styleUrls: ['./requester-view.component.css']
})
export class RequesterViewComponent implements OnInit {
  id:any;
  constructor(
    private route:ActivatedRoute,
    private Sharedservice:SharedService
  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.getOne();
  }

  getOne(){
    this.Sharedservice.getOne(this.id).subscribe ((data: any) =>
      {
        console.log(data);
      })
  }

}
