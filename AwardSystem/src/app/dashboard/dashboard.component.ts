import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Department } from 'Models/Department';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { Employee } from 'Models/Employee';
import { AwardType } from 'Models/AwardType';
import { AwardService } from '../award.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService, private awardService: AwardService, private router: Router) { }

  awardData: any;
  isAward = 0;
  Awards: any =
    {
      id: 0,
      requesterId: 0,
      awardeeId: 0,
      awardTypeId: 0,
      approverId: 0,
      reason: '',
      rejectReason: '',
      hRId: 0,
      couponCode: '',
      statusId: 0,
      isActive: true,
    }
  
  salesData: ChartData<'bar'> = {
    labels: ['Development', 'Testing', 'Facility', 'Security', 'Management'],
    datasets: [
      { label: 'Rolestar', data: [10, 12, 10, 20, 50] },
      { label: 'Tech Thunder', data: [20, 10, 40, 50, 90] },
      { label: 'Gladiator', data: [50, 40, 35, 45, 50] },
      { label: 'First victor', data: [10, 50, 10, 60, 90] },
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Awards In each Organisation',
      },
    },
  };
  organisations: Organisation[] = [];
  departments: Department[] = [];
  employee: Employee[] = [];
  reportingPersonList: any;
  hrList: any;
  SelectOrg: any = 0;
  SelectDep: any = 0;
  data: AwardType[] = [];


  endpoint = "Organisation";
  endpoint1 = "AwardType";
  ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data => {
      this.organisations = data;
      console.log(this.organisations);
    });
    this.sharedService.getAll(this.endpoint1).subscribe(data => {
      this.awardData = data;
      console.log(this.awardData);
    });

  }

  onSelectDep() {
    this.sharedService.getDepartmentByOrganisation(this.SelectOrg).subscribe(data => {
      this.departments = data;
      console.log(this.departments);
    });


  }

}
