import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { Department } from 'Models/Department';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  constructor(private sharedService:SharedService,private router:Router,private toastService: HotToastService,private dialog: MatDialog) { }
  Designation : any = {
    id : 0,
    designationName : '',
    departmentId  : 0,
    roleId:0,
    addedBy : 1,
    addedOn : Date.now

  }
  departments : Department[]=[];
  selectOrg:any=0;
  endpoint="Department";
  endpoint1="Designation";

   ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.departments=data;
      console.log(this.departments);
    });

   }

  OnSubmit(){
    this.sharedService.add(this.endpoint1,this.Designation).subscribe(data=>{
      console.log(data);
      this.showToast();
    });
  }
  showToast() {
    this.toastService.success('Successfully added!',
    {
      autoClose: true,
      dismissible: true,
      icon: '❎',
    })
    this.router.navigate(['/designation']);

  }
}
