import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

endpoint="Organisation";
  constructor(private sharedService:SharedService, private location: Location, private router:Router,private toastService: HotToastService,private dialog: MatDialog) { }
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
      this.showToast();
    })
    
  }
  showToast() {
    this.toastService.success('Successfully added!',
    {
      autoClose: true,
      dismissible: true,
      icon: '❎',
    })
    this.router.navigate(['/organisation']);

  }


}


