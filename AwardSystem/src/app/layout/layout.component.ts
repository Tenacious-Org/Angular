import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;

  constructor(private route: Router) { }
  token: any;
  ngOnInit(): void {
    this.token = AuthenticationService.GetData("token");
    this.user = AuthenticationService.GetData("Role");
  }
  onLogin() {
    this.route.navigateByUrl("/login")
  }

  onLogout() {
    AuthenticationService.Logout();
    //this.route.navigateByUrl('')
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/homecard/0'])
    });
    // window.location.reload()
  }

}
