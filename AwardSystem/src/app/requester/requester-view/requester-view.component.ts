import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-requester-view',
  templateUrl: './requester-view.component.html',
  styleUrls: ['./requester-view.component.css']
})
export class RequesterViewComponent implements OnInit {
  Id:any;
  data:any;
  constructor(private awardService:AwardService,
    private route:ActivatedRoute,private dialog: MatDialog,private routing:Router) { }
  ngOnInit(): void {
    if(!AuthenticationService.GetData("Requester")&& !AuthenticationService.GetData("Approver")&& !AuthenticationService.GetData("Publisher")){
      this.routing.navigateByUrl("")
    }
    this.route.params.subscribe(params => {
      this.Id = params['id'];
     this.awardService.getAwardById(this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.data);
          
        });
      });
  }
}
