import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

endpoint="Organisation";
  constructor(private sharedService:SharedService, private location: Location, private router:Router) { }
  Organisation : any = {
    id : 0,
    organisationName : '',
    addedBy : 1,
    addedOn : Date.now
 
  }

  ngOnInit(): void {
   
  }

  OnSubmit(){
    console.log(this.Organisation)
    this.sharedService.add(this.endpoint,this.Organisation).subscribe((res) =>{
      console.log(res);
    })
    this.router.navigate(['/organisation']);
  }

}

