
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMessage = false;
  IsAdmin: boolean = false;
  IsRequester: boolean = false;
  IsApprover: boolean = false;
  IsPublisher: boolean = false;
  IsLoading: boolean = false;
  IsVerified: string = ''
  returnUrl: any;
  constructor(private http: HttpClient, private router: Router, private route:ActivatedRoute,private authenticationService: AuthenticationService) { }
  user: any = {

    email: '',
    password: '',

  }


  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  OnSubmit() {

    this.IsLoading = true;
    this.showErrorMessage = false;
    const headers = { 'content-type': 'application/json' }
    this.http.post<any>(`https://localhost:7275/Token`, this.user)
      .subscribe({
        next: (data) => {
          this.IsAdmin = data.isAdmin,
            this.IsRequester = data.isRequester,
            this.IsApprover = data.isApprover,
            this.IsPublisher = data.isPublisher,
          AuthenticationService.SetDateWithExpiry("token", data.token, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("Role", data.isRole, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("User", data.userId, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("Admin", data.isAdmin, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("Requester", data.isRequester, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("Approver", data.isApprover, data.expiryInMinutes)
          AuthenticationService.SetDateWithExpiry("Publisher", data.isPublisher, data.expiryInMinutes)

          if (this.IsAdmin) {

            this.router.navigateByUrl("/dashboard").then(() => {
              window.location.reload();
            })
          }
          else {
            this.router.navigateByUrl(this.returnUrl)
            console.log(this.returnUrl)
            //this.route.navigateByUrl("").then(() => {
              //window.location.reload();
           // })

          }
        },

        error: (error) => {

          this.showErrorMessage = true;
        }
      });

  }

}