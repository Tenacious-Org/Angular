import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { OrganisationService } from '../organisation.service';


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

  constructor(private organisationService:OrganisationService) { }
  id = 0;
  organisationName = '';
  isActive = true;
  addedBy = 1;
  addedOn = Date.now;
  updatedBy = 1;
  updatedOn = Date.now;
  

  Organisation : any = {
    id : 0,
    organisationName : this.organisationName,
    isActive : this.isActive,
    addedBy : this.addedBy,
    addedOn : this.addedOn,
    updatedBy : this.updatedBy,
    updatedOn : this.updatedOn,
  
  }

  ngOnInit(): void {
  }
  OnSubmit(){
    // console.log(this.Organisation)
    this.organisationService.AddOrganisation(this.Organisation).subscribe((res) =>{
      console.log(res);
    })
  }
 

}

