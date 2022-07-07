import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  pageId = 2;
  employeeId = AuthenticationService.GetData('User');
  totalLength: any;
  page: number = 1;
  data: any;
  filtervalue: any;
  val: any;
  constructor(private awardService: AwardService) {}

  ngOnInit(): void {
    this.getAll();
  }
  onSubmit() {
    if (this.filtervalue == '') {
      this.getAll();
    }
  }
  getAll() {
    this.awardService
      .getAwardsList(this.pageId, this.employeeId)
      .subscribe((data) => {
        this.data = data;
        this.totalLength = data;
        console.log(this.data);
      });
  }
}
