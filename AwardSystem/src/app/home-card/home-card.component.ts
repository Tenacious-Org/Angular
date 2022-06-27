import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';
import { Awards } from 'Models/Awards';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  employeeId=6;
  constructor(private awardService:AwardService,private router:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.AwardId = params['id'];
    this.awardService.getAwardsList(this.pageId,this.employeeId).subscribe(data=>{
      this.awardData=data;
    });
  });

  
  }
  @Input() ShowStatus:boolean =true;
	searchAward = "";
	searchAwardee = "";
	FromDate = new Date("0001-01-01");
	ToDate = new Date("0001-01-01");
	public data:Awards [] = [];
  
	public filteredData: Awards[] = [];
	samplefun(searchAward: string, searchAwardee: string, FromDate: any, ToDate: any) {

		if (searchAward.length == 0 && searchAwardee.length == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) this.data = this.filteredData


		//1.Search by title
		if (searchAward.length != 0 && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("title")
			this.data = this.filteredData.filter(item => item.awardTypeId);
		}
		//2.Search by awardee
		else if (searchAward == '' && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("awardee")
			this.data = this.filteredData.filter(item => item.awardeeId);
		}
		//3.Search by FromDate
		else if (searchAward == '' && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("FromDate")
			this.data = this.filteredData.filter(item => new Date(item.updatedOn.toString()) >= new Date(FromDate));
		}
		//4.Search by ToDate
		else if (searchAward == '' && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("ToDate")
			this.data = this.filteredData.filter(item => new Date(item.updatedOn.toString()) <= new Date(ToDate));
		}
		//5.search by title and awardee
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("title&awardee")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) });
		}
		//6.search by title and fromdate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("title&FromDate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) });
		}
		//7.search by title and Todate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("title&ToDate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//8.search by awardee and fromdate
		else if (searchAward == '' && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("awardee&fromDate")
			this.data = this.filteredData.filter(item => { return (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) });
		}
		//9.search by awardee and todate
		else if (searchAward == '' && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("awardee&ToDate")
			this.data = this.filteredData.filter(item => { return (item.awardeeId) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//10.search by fromdate and todate
		else if (searchAward == '' && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("fromdate&TsearchTitle == ''oDate")
			this.data = this.filteredData.filter(item => { return new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//11.search by awardee,title and fromdate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("title,awardee,fromdate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) });
		}
		//12.search by awardee,title and Todate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("title,awardee,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//13.search by awardee,Fromdate and Todate
		else if (searchAward == '' && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("awardee,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//14.search by Title,Fromdate and Todate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("title,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return( item.awardTypeId ) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//14.search by Title,awardee,Fromdate and Todate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("title,awardee,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}

	}
}



