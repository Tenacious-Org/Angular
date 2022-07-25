import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AwardService } from 'src/app/award.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})
export class AwardListComponent implements OnInit {
  pageId: any;
  totalLength: any;
  page: number = 1;
  data: any;
  val: any;
  searchValue = '';
  filtervalue: any = 0;
  endpoint = 'status';
  statusList: any;
  public filteredData: any[] = [];



  constructor(private awardService: AwardService, private sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Requester") && !AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")) {
      this.router.navigateByUrl("")
    }
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['id'];
    });
    this.GetAllAwardsList();
    this.GetAllStatus();

  }
  GetAllStatus(){
    this.sharedService.GetAll(this.endpoint).subscribe((data: any) => {
      if(this.pageId!=4){
        this.statusList=data;
      }
      if(this.pageId==4){
        this.statusList = data.filter((obj) => (obj.id) != 1 &&  (obj.id) != 3); 
      }
    })
  }
  GetAllAwardsList() {
    this.awardService
      .GetAwardsList(this.pageId)
      .subscribe((data) => {
        this.data = data;
        this.filteredData = data;
      });
  }
  changestatus(e: any) {
    this.filtervalue = e.target.value;
    if (this.filtervalue == 0) {
      this.GetAllAwardsList();
    } else {
      this.data = this.filteredData.filter(item => item.statusId == this.filtervalue);
    }
    this.page = 1;
  }
  Search(value: string) {
    this.data = this.filteredData.filter(item =>
      item.awardeeName.toLowerCase().includes(value.toLowerCase()) || item.awardName.toLowerCase().includes(value.toLowerCase()))
    this.page = 1;
  }

}
