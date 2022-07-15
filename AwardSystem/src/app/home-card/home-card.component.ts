import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardService } from '../award.service';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  myAwards:any;
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
	date: any;
	isShow=true;

	constructor(private awardService:AwardService,private sharedService:SharedService,private router:ActivatedRoute ,private route:Router){ }

  ngOnInit(): void {
	this.isValidUser=AuthenticationService.GetData("token");
    this.awardList()
  this.sharedService.getAll(this.endpoint).subscribe(res=>{
	this.awardTypes=res;});

	this.sharedService.getAll(this.endpoint1).subscribe(data=>{
		this.organisations=data;
		console.log(this.organisations);
	  });

  }
  awardList(){
	this.router.params.subscribe(params => {
		this.myAwards= params['id'];
		  if(this.myAwards!=null){
			  this.pageId=1;
			  this.awardService.getAwardsList(this.pageId).subscribe(data=>{
				  this.awardData=data;
				  this.filteredData=data;
				  console.log(this.filteredData)
				});
		  }
	  this.awardService.getAwardsList(this.pageId).subscribe(data=>{
		this.awardData=data;
		this.filteredData=data;
		console.log(this.filteredData)
	  });
	});
  }
  advanced()
  {
	this.isShow=!this.isShow;
  }
 
  onSelectDep(){
    this.sharedService.getDepartmentByOrganisation(this.searchOrganisation).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }
  
  
  @Input() ShowStatus:boolean =true;
  	isApplied=false;
  	searchOrganisation=0;
  	searchDepartment=0;
	searchAwardType =0;
	searchAwardee = "";
	FromDate = new Date("0001-01-01");
	ToDate = new Date("0001-01-01");
	public data:any[] = [];
	public filteredData: any[] = [];

	awardFilter(searchOrganisation: any, searchDepartment: any,searchAwardType:any, FromDate: any, ToDate: any) {
 
		console.log(this.FromDate)
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
		//4.Search by department and award type
		else if (searchOrganisation != 0 && searchDepartment != 0&& searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log(searchOrganisation)
			console.log(searchDepartment)
			this.awardData = this.filteredData.filter(item => item.organisationId==searchOrganisation && item.departmentId==searchDepartment && item.awardTypeId==searchAwardType );
		}
		 //5.Search by FromDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate));
			console.log(this.awardData)
		}
		//6.Search by ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0  && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate));
		}
		//7.Search by department and FromDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate) && item.organisationId==searchOrganisation && item.departmentId==searchDepartment );
			console.log(this.awardData)
		}
		//8.Search by department and ToDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType == 0  && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate)&& item.organisationId==searchOrganisation && item.departmentId==searchDepartment );
		}
		//9.Search by FromDate and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0  && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate));
		}
		//10.Search by award type and FromDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate)&& item.awardTypeId==searchAwardType);
			console.log(this.awardData)
		}
		//11.Search by award type and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0  && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate)&& item.awardTypeId==searchAwardType);
		}
		//12.Search by award type and FromDate and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0  && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate) && item.awardTypeId==searchAwardType);
		}
		//13.Search by department and award type and FromDate and ToDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType != 0  && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("true")
			this.awardData = this.filteredData.filter(item => item.organisationId==searchOrganisation && item.departmentId==searchDepartment && item.awardTypeId==searchAwardType && new Date(item.updatedOn)>= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate));
		}
		this.isApplied=true;
		
	}
	Reset(formValue: NgForm){
		
		formValue.reset();
		this.awardList();
		this.isApplied=false;
	}
}



