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
    console.log(this.user)
  }
  onLogin(){
    this.route.navigateByUrl("/login")
  }

  onLogout(){
    AuthenticationService.Logout();
    this.route.navigateByUrl("")

  }

}
