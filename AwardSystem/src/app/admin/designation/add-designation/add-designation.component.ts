import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Designation } from 'Models/Designation';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  organisationID : ''
  constructor(private sharedService:SharedService) { }
  Designation : any = {
    id : 0,
    designationName : '',
    departmentID : '',
    addedBy : 1,
    addedOn : Date.now
 
  }

  ngOnInit(): void {
  }
  OnSubmit(){
    this.sharedService.addDesignation(this.Designation).subscribe((res) =>{
      console.log(res);
    })
  }

}
