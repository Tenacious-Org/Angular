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
 
  constructor() { }

  ngOnInit(): void {
    this.role=AuthenticationService.GetData("Role");
    
  }
  isShowDivIf = false;
  
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }


}
