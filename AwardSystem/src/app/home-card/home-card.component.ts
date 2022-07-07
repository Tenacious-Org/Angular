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
  employeeId=0;
  isReadMore =true;
  constructor(private awardService:AwardService,private router:ActivatedRoute,private http:HttpClient){ }

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


		//1.Search by award
		if (searchAward.length != 0 && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("award")
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
		//5.search by award and awardee
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("award&awardee")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) });
		}
		//6.search by award and fromdate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("award&FromDate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) });
		}
		//7.search by award and Todate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("award&ToDate")
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
			console.log("fromdate&Tsearchaward == ''oDate")
			this.data = this.filteredData.filter(item => { return new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//11.search by awardee,award and fromdate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			console.log("award,awardee,fromdate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) });
		}
		//12.search by awardee,award and Todate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("award,awardee,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//13.search by awardee,Fromdate and Todate
		else if (searchAward == '' && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("awardee,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//14.search by award,Fromdate and Todate
		else if (searchAward.length != 0 && searchAwardee == '' && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("award,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return( item.awardTypeId ) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}
		//14.search by award,awardee,Fromdate and Todate
		else if (searchAward.length != 0 && searchAwardee.length != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			console.log("award,awardee,fromdate,Todate")
			this.data = this.filteredData.filter(item => { return (item.awardTypeId) && (item.awardeeId) && new Date(item.updatedOn.toString()) >= new Date(FromDate) && new Date(item.updatedOn.toString()) <= new Date(ToDate) });
		}

	}
}



