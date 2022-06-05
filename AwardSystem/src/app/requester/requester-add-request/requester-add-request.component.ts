import { Component, OnInit } from '@angular/core';
import {Employee} from 'Models/Employee';
import {Awards} from 'Models/Awards';
import {SharedService} from 'src/app/shared.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AwardType } from 'Models/AwardType';
import { AwardService } from 'src/app/award.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-requester-add-request',
  templateUrl: './requester-add-request.component.html',
  styleUrls: ['./requester-add-request.component.css']
})
export class RequesterAddRequestComponent implements OnInit {
  
  endpoint="Employee";
  endpoints="AwardType";
  employeeId=6;
  selectedValue:any;

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


  constructor(private sharedService:SharedService,private awardService:AwardService,private formBuilder:FormBuilder) { }

  
  data:AwardType[]=[];



  ngOnInit(): void {
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
  onSelectionChanged(event:any){
    this.selectedValue = event.option.id;
    console.log(this.selectedValue);
  }

  OnSubmit(){
    console.log(this.Awards);
    this.Awards.awardeeId=this.selectedValue;
    this.awardService.addRequest(this.Awards,this.employeeId).subscribe(data=>{
      console.log(data);
    });
  }


}
