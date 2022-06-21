import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  admin=1;
  user=2;
  requester=3;
  approver=4;
  publisher=5;
  role:any;
  constructor() { }

  ngOnInit(): void {
    this.role=this.publisher;
  }

}
