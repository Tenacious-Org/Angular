import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-view-award',
  templateUrl: './view-award.component.html',
  styleUrls: ['./view-award.component.css']
})
export class ViewAwardComponent implements OnInit {
  data: any;
  Id = 0;
  endpoint = "AwardType"
  constructor(private sharedService: SharedService, private http: HttpClient, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.route.navigateByUrl("")

    }
    this.router.params.subscribe(params => {
      this.Id = params['id'];
      this.http
      this.sharedService.GetById(this.endpoint, this.Id).subscribe((result) => {
        this.data = result;
      });
    });
  }

}
