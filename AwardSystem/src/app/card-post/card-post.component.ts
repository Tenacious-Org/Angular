import { Component, Input, OnInit } from '@angular/core';
import { AwardService } from '../award.service';
import { Comments } from 'Models/Comments';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Awards } from 'Models/Awards';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent implements OnInit {
  AwardId:any;
  awardData: any;
  totalLength: any;
  page: number = 1;
  pageId=1;
  searchValue:any;
  employeeId=AuthenticationService.GetData("User");
  isReadMore =true;
  isShow=true;
	endpoint="AwardType";
	awardTypes: any;

  constructor(private awardService:AwardService,private sharedService:SharedService,private router:ActivatedRoute){ }

  ngOnInit(): void {
	
    this.router.params.subscribe(params => {
      this.AwardId = params['id'];
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>{
      this.awardData=data;
	  this.filteredData=data;
    });
  });
  this.sharedService.getAll(this.endpoint).subscribe(res=>{
	this.awardTypes=res;});

  }
  advanced()
  {
	this.isShow=!this.isShow;
  }
 
  
@Input() ShowStatus:boolean =true;
isApplied=false;
searchAwardType =0;
searchAwardee = "";
FromDate = new Date("0001-01-01");
ToDate = new Date("0001-01-01");
public data:any[] = [];
public filteredData: any[] = [];

awardFilter(searchAwardType:any, FromDate: any, ToDate: any) {

	console.log(this.FromDate)
	if (searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) this.data = this.filteredData

	//1.Search by awardType
	console.log(searchAwardType)
	if (searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => item.awardTypeId==searchAwardType);
	}
	
	 //2.Search by FromDate
	else if ( searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate));
		console.log(this.awardData)
	}
	//3.Search by ToDate
	else if (searchAwardType == 0  && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate));
	}
	
	//4.Search by FromDate and ToDate
	else if ( searchAwardType == 0  && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate));
	}
	//5.Search by award type and FromDate
	else if ( searchAwardType != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate)&& item.awardTypeId==searchAwardType);
		console.log(this.awardData)
	}
	//6.Search by award type and ToDate
	else if ( searchAwardType != 0  && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate)&& item.awardTypeId==searchAwardType);
	}
	//7.Search by award type and FromDate and ToDate
	else if ( searchAwardType != 0  && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
		this.awardData = this.filteredData.filter(item => new Date(item.updatedOn)>= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate) && item.awardTypeId==searchAwardType);
	}
	
}
// Reset(){
// 	this.isApplied=false;
// 	this.route.navigateByUrl("");
	
// }
}
