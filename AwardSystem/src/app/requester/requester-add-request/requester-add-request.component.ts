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
  id=6;


  searchAwardee!: FormControl;
  filteredOptions!: Observable<any[]>;
  employees : Employee[] = [];

  Awards:any=
   {
    id : 0,
    requesterId : 6,
    awardeeId : 0,
    awardTypeId : 0,
    approverId : 5,
    reason :  '',
    rejectReason :  '',
    hRId : 4,
    couponCode :'',
    statusId : 1,
    isActive :  true,
 }

  //data:string[]=['Ajay','Jeeva']
  constructor(private sharedService:SharedService,private awardService:AwardService,private formBuilder:FormBuilder) { }

  
  data:AwardType[]=[];



  ngOnInit(): void {
    this.sharedService.getEmployeeByRequester(this.id).subscribe(response=>{
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
  private _filter(val:string){
    return this.employees.filter((s) => new RegExp(val, 'gi').test(s.firstName));
  }

  OnSubmit(){
    console.log(this.Awards);
    this.awardService.addRequest(this.Awards).subscribe(data=>{
      console.log(data);
    });
  }


}
