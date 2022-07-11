import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';
import { Awards } from 'Models/Awards';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Token } from '@angular/compiler';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  AwardId:any;
  awardData: any;
  totalLength: any;
  page: number = 1;
  pageId=0;
  employeeId=0;
  isReadMore =true;
  searchValue:any;
  isValidUser:any;
	awardTypes: any;
	endpoint="AwardType";
	organisations: any;
	endpoint1="Organisation";
	departments: any;
	constructor(private awardService:AwardService,private sharedService:SharedService,private router:ActivatedRoute,private http:HttpClient){ }

  ngOnInit(): void {
	this.isValidUser=AuthenticationService.GetData("User");
    this.router.params.subscribe(params => {
      this.AwardId = params['id'];
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>{
      this.awardData=data;
	  this.filteredData=data;
	  console.log(this.filteredData)
    });
  });
  this.sharedService.getAll(this.endpoint).subscribe(res=>{
	this.awardTypes=res;});

	this.sharedService.getAll(this.endpoint1).subscribe(data=>{
		this.organisations=data;
		console.log(this.organisations);
	  });

  }
  onSelectDep(){
    this.sharedService.getDepartmentByOrganisation(this.searchOrganisation).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }
  
  @Input() ShowStatus:boolean =true;
  	
  	searchOrganisation=0;
  	searchDepartment=0;
	searchAwardType =0;
	searchAwardee = "";
	FromDate = new Date("0001-01-01");
	ToDate = new Date("0001-01-01");
	public data:any[] = [];
	public filteredData: any[] = [];

	samplefun(searchOrganisation: any, searchDepartment: any,searchAwardType:any, FromDate: any, ToDate: any) {

		if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) this.data = this.filteredData


		//1.Search by awardType
		console.log(searchAwardType)
		if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.awardTypeId==searchAwardType);
		}
		//2.Search by organisation
		
		else if (searchOrganisation != 0 && searchDepartment == 0&& searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log(searchOrganisation)
			this.awardData = this.filteredData.filter(item => item.organisationId==searchOrganisation);
		}
		//3.Search by department
		else if (searchOrganisation != 0 && searchDepartment != 0&& searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log(searchOrganisation)
			console.log(searchDepartment)
			this.awardData = this.filteredData.filter(item => item.organisationId==searchOrganisation && item.departmentId==searchDepartment );
		}
		//3.Search by department and award type
		else if (searchOrganisation != 0 && searchDepartment != 0&& searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log(searchOrganisation)
			console.log(searchDepartment)
			this.awardData = this.filteredData.filter(item => item.organisationId==searchOrganisation && item.departmentId==searchDepartment && item.awardTypeId==searchAwardType );
		}
		// //4.Search by ToDate
		// else if (searchAward == '' && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
		// 	console.log("ToDate")
		// 	this.data = this.filteredData.filter(item => new Date(item.updatedOn.toString()) <= new Date(ToDate));
		// }
		
	}
}



