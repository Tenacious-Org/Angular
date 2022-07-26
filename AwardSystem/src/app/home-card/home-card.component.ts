import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AwardService } from '../award.service';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';


@Component({
	selector: 'app-home-card',
	templateUrl: './home-card.component.html',
	styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {
	@Input() ShowStatus: boolean = true;
	isApplied = false;
	searchOrganisation = 0;
	searchDepartment = 0;
	searchAwardType = 0;
	searchAwardee = "";
	FromDate = new Date("0001-01-01").toString();
	ToDate = new Date("0001-01-01").toString();
	public data: any[] = [];
	public filteredData: any[] = [];

	id: any;
	awardData: any;
	totalLength: any;
	page: number = 1;
	pageId: any;
	employeeId = 0;
	isReadMore = true;
	searchValue='';
	isValidUser: any;
	val:any;
	awardTypes: any;
	endpoint = "AwardType";
	organisations: any;
	endpoint1 = "Organisation";
	departments: any;
	date: any;
	isShow = true;

	constructor(private awardService: AwardService, private sharedService: SharedService, private router: ActivatedRoute, private route: Router ) { }

	ngOnInit(): void {
		this.isValidUser = AuthenticationService.GetData("token");
		this.awardList()
		this.sharedService.GetAll(this.endpoint).subscribe(res => {
			this.awardTypes = res;
		});

		this.sharedService.GetAll(this.endpoint1).subscribe(data => {
			this.organisations = data;
		});

	}
	
	awardList() {
		this.router.params.subscribe(params => {
			this.pageId = params['id'];
			this.awardService.GetAwardsList(this.pageId).subscribe(data => {
				this.awardData = data;
				this.filteredData = data;
			});
		});
	}
	advanced() {
		this.isShow = !this.isShow;
	}

	onSelectDep() {
		this.sharedService.GetDepartmentByOrganisationId(this.searchOrganisation).subscribe(data => {
			this.departments = data;
		});
	}


	

	awardFilter(searchOrganisation: any, searchDepartment: any, searchAwardType: any, FromDate: any, ToDate: any) {

		if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) this.data = this.filteredData

		//1.Search by awardType
		if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.awardTypeId == searchAwardType);
		}
		//2.Search by organisation
		else if (searchOrganisation != 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.organisationId == searchOrganisation);
		}
		//3.Search by department
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.organisationId == searchOrganisation && item.departmentId == searchDepartment);
		}
		//4.Search by department and award type
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.organisationId == searchOrganisation && item.departmentId == searchDepartment && item.awardTypeId == searchAwardType);
		}
		
		//5.Search by FromDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) >= new Date(FromDate));
		}
		//6.Search by ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate));
		}
		//7.Search by department and FromDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) >= new Date(FromDate) && item.organisationId == searchOrganisation && item.departmentId == searchDepartment);
		}
		//8.Search by department and ToDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType == 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate) && item.organisationId == searchOrganisation && item.departmentId == searchDepartment);
		}
		//9.Search by FromDate and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType == 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) >= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate));
		}
		//10.Search by award type and FromDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate != new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) >= new Date(FromDate) && item.awardTypeId == searchAwardType);
		}
		//11.Search by award type and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) <= new Date(ToDate) && item.awardTypeId == searchAwardType);
		}
		//12.Search by award type and FromDate and ToDate
		else if (searchOrganisation == 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => new Date(item.updatedOn) >= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate) && item.awardTypeId == searchAwardType);
		}
		//13.Search by department and award type and FromDate and ToDate
		else if (searchOrganisation != 0 && searchDepartment != 0 && searchAwardType != 0 && FromDate != new Date("0001-01-01").toString() && ToDate != new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.organisationId == searchOrganisation && item.departmentId == searchDepartment && item.awardTypeId == searchAwardType && new Date(item.updatedOn) >= new Date(FromDate) && new Date(item.updatedOn) <= new Date(ToDate));
		}
		//14.Search by Organisation and award type
		else if (searchOrganisation != 0 && searchDepartment == 0 && searchAwardType != 0 && FromDate == new Date("0001-01-01").toString() && ToDate == new Date("0001-01-01").toString()) {
			this.awardData = this.filteredData.filter(item => item.organisationId == searchOrganisation && item.awardTypeId == searchAwardType);
		}
		this.isApplied = true;
		this.page=1;
	}
	Search(value:string){
		this.awardData=this.filteredData.filter(item =>
		item.awardeeName.toLowerCase().includes(value.toLowerCase()) || item.awardName.toLowerCase().includes(value.toLowerCase()))
		this.page=1;
	}

	Reset() {
		this.searchOrganisation = 0;
		this.searchDepartment = 0;
		this.searchAwardType = 0;
		this.FromDate = new Date("0001-01-01").toString();
		this.ToDate = new Date("0001-01-01").toString();
		this.ngOnInit();
		this.isApplied = false;
		this.page=1;
	}
}



