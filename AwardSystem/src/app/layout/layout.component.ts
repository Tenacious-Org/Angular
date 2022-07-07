import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private route:Router) { }
user:any;
  ngOnInit(): void {
    this.user=AuthenticationService.GetData("token");
  }
  onSubmit(){
    AuthenticationService.Logout();
    this.route.navigateByUrl("")

  }

}
