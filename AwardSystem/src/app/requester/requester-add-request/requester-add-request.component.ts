import { Component, OnInit } from '@angular/core';
import {Employee} from 'Models/Employee';
import {SharedService} from 'src/app/shared.service';
import { AwardType } from 'Models/AwardType';
import { AwardService } from 'src/app/award.service';
import { FormBuilder, FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-requester-add-request',
  templateUrl: './requester-add-request.component.html',
  styleUrls: ['./requester-add-request.component.css']
})
export class RequesterAddRequestComponent implements OnInit {

  endpoint="Employee";
  endpoints="AwardType";
  employeeId=AuthenticationService.GetData("User");
  selectedAwardee:any;
  selectedAward:any;
  awardeeData:any;
  isAwardee=0;
  isAward=0;
  awardData:any;
  searchAwardee!: FormControl;
  filteredOptions:any;
  employees : Employee[] = [];

  Awards:any=
   {
    id : 0,
    requesterId : 0,
    awardeeId : 0,
    awardTypeId : 0,
    approverId : 0,
    reason :  '',
    rejectReason : '',
    hRId : 0,
    couponCode :'',
    statusId : 0,
    isActive :  true,
 }
  firstName: any;
  error: any;


  constructor(private sharedService:SharedService,private awardService:AwardService,private formBuilder:FormBuilder,private toastService: HotToastService,private router:Router) { }


  data:AwardType[]=[];



  ngOnInit(): void {
    if(!AuthenticationService.GetData("Requester")&& !AuthenticationService.GetData("Approver") && !AuthenticationService.GetData("Publisher")){
      this.router.navigateByUrl("")
    }
    this.sharedService.getEmployeeByRequester(this.employeeId).subscribe(response=>{
     this.employees=response;
     console.log(this.employees)
    });

    this.searchAwardee = new FormControl();

    this.filteredOptions=this.searchAwardee.valueChanges.pipe(
      startWith(null),
      map(value=>this._filter(value))
    );
    console.log(this.filteredOptions)

    this.sharedService.getAll(this.endpoints).subscribe(data=>{
      this.data=data;
      console.log(this.data);
    });

  }
  private _filter(val:string):any[]{
    return this.employees.filter((s) => new RegExp(val, 'gi').test(s.firstName));
  }
  onSelectAwardee(event:any){
    this.selectedAwardee = event.option.id;
    console.log(this.selectedAwardee);
    this.sharedService.getById(this.endpoint,this.selectedAwardee).subscribe(data=>{
    this.awardeeData=data;
    this.isAwardee=1;
    console.log(this.awardeeData);
  });
  }

  onSelectAward(){
    this.sharedService.getById(this.endpoints,this.Awards.awardTypeId).subscribe(data=>{
      this.awardData=data;
      this.isAward=1;
      console.log(this.awardData);
    });
  }

  OnSubmit(){
    console.log(this.Awards);
    this.Awards.awardeeId=this.selectedAwardee;
    console.log("awardeeid: ", this.Awards.awardeeId)
    console.log("awardtypeid: ", this.Awards.awardTypeId)
    console.log("employeeid: ", this.employeeId)
    this.awardService.addRequest(this.Awards).subscribe({
      next: (res) => { console.log(res),  res?this.showToast():null  },
      error: (error) => this.error = error.error.message
    });
  }
  showToast() {
    this.toastService.success('Request Added Succssfully!',
    {
      autoClose: true,
      dismissible: true,
    })
    this.router.navigate(['/awardlist/2']);
  }
  CheckName(FirstName:any)
  {
    this.firstName=FirstName;
  }

}
