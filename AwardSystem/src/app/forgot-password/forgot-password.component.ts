import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Employee } from 'Models/Employee';
import { SharedService } from '../shared.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: any;

  constructor( private sharedService:SharedService,private router: Router, private toastService: HotToastService) { }
  UserDetails: any = {
    aceid: '',
    email: '',
  }
  ngOnInit(): void {  
  }
  OnSubmit(){
this.sharedService.ForgotPassword(this.UserDetails).subscribe({
  next: (res) => { res ? this.showToast() : null },
  error: (error) => this.error = error.error.message
})
  }
  showToast() {
    this.toastService.success('Password sent to your mail !',
    {
      autoClose: true,
      dismissible: true,
    })
  this.router.navigate(['/login']);
  }

}
