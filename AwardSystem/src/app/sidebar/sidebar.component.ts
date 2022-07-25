import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  role: any;
  id: any;
  data: string[] = [];
  endpoint = "Employee";
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.role = AuthenticationService.GetData("Role");
    this.id = AuthenticationService.GetData("User");
    this.sharedService.GetById(this.endpoint, this.id)
      .subscribe((data) => {
        this.data = data;
      });
  }

  isShowDivIf = false;

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  reloadrequest() {
    this.router.navigateByUrl('/awardlist/2')
    // , { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/awardlist/2']);
    // })
  }
  reloadapprove() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/awardlist/3']);
    })
  }
  reloadpublish() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/awardlist/4']);
    })
  }


}
