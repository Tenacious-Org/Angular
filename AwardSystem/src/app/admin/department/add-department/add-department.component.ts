import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Organisation } from 'Models/Organisation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private toastService: HotToastService,private sharedService:SharedService, private router:Router,private dialog: MatDialog) {}

    response="success";
    Department : any = {
    id :0,
    departmentName : '',
    organisationId :0,
    addedBy : 1,
    addedOn : Date.now ,
    updatedBy : 1,
    updatedOn : Date.now, 
  }
  
endpoint="Department";
endpoint1="Organisation";
  ngOnInit(): void {
    this.sharedService.getAll(this.endpoint1).subscribe(data=>{
      this.data=data;
    });
    

  }
  public data: Organisation[] = [];
  OnSubmit(){
    console.log(this.Department)
    this.sharedService.add(this.endpoint,this.Department).subscribe((res) =>{
      console.log(res);
      this.showToast;
    })
  }
  showToast() {
    this.toastService.success('Successfully added!')
    this.router.navigate(['/department']);
  }
  }
  
    

  


