import { trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
          style({
              opacity: 0
          }),
          animate("500ms ease-in", style({
              opacity: 1
          }))
      ]),
      transition('* => void', [
          style({
              opacity: 1
          }),
          animate("500ms ease-in", style({
              opacity: 0
          }))
        ])
      ])
  ]
})
export class SidebarComponent implements OnInit {

  role:any;
  userName:any;
  id: any;
  endpoint="Employee";
  data: any;
  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.role=AuthenticationService.GetData("Role");
    console.log(this.role)
    this.id=AuthenticationService.GetData("User");
    this.sharedService.getById(this.endpoint,this.id)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });  }
  isShowDivIf = false;
  
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }


}
