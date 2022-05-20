import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.css']
})
export class EditOrganisationComponent implements OnInit {
  
  constructor(private sharedService:SharedService,
    private route:ActivatedRoute, private location: Location) { }
endpoint="Organisation";
    id:any;
    data:any;

    Organisation:any={
      Id:0,
      OrganisationName:'',
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    console.log(this.id)
   this.sharedService.getById(this.endpoint,this.id).subscribe((data) => {
        this.data = data;
        console.log(data);
      });
    });
  }

  goBack() {
    // window.history.back();
    this.location.back();
    console.log( 'goBack()...' );
  }

}
