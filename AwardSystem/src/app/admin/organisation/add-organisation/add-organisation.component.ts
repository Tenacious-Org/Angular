import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {


  constructor(private sharedService:SharedService, private location: Location) { }
  Organisation : any = {
    id : 0,
    organisationName : '',
    addedBy : 1,
    addedOn : Date.now
 
  }

  ngOnInit(): void {
   
  }
  OnSubmit(){
    this.sharedService.addOrganisation(this.Organisation).subscribe((res) =>{
      console.log(res);
    })
  }
 
  goBack() {
    // window.history.back();
    this.location.back();
    console.log( 'goBack()...' );
  }

}

