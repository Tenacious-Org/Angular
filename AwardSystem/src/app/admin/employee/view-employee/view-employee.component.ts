import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  data :any;
  Id=0;

  constructor(private sharedService: SharedService,private http:HttpClient , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.Id = params['id'];
    this.http
      .get<any>(`https://localhost:7275/api/Employee/GetById?id=${this.Id}`)
      .subscribe((data) => {
        this.data = data;
        console.log(this.Id)
        console.log(data);
      });
    });
  }
}
