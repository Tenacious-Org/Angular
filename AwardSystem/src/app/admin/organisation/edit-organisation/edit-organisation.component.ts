import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/shared.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Organisation } from 'Models/Organisation';


@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.css']

})
export class EditOrganisationComponent implements OnInit {
  
 
    endpoint="Organisation";
    id:any;
    data:any;

    Organisation:any={
      Id:0,
      OrganisationName:'',
    }
    constructor(private sharedService:SharedService, private route:ActivatedRoute, private location: Location, private router:Router, private routing:Router,private toastService: HotToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    console.log(this.id)
   this.sharedService.getById(this.endpoint,this.id).subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
    });
  }

  OnSubmit(){
    console.log(this.data);
    this.sharedService.edit(this.endpoint,this.data).subscribe(data=>{
      console.log(data);
      this.showToast();
    });
} 
showToast() {
  this.toastService.success('Successfully updated!',
  {
    autoClose: true,
    dismissible: true,
    icon: '❎',
  })
  this.routing.navigate(['/organisation']);
}     
}

