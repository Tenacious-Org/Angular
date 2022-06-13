import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';

import { SharedService } from 'src/app/shared.service';
import { DesignationVM } from 'ViewModels/DesignationVM';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  totalLength: any;
  page: number = 1;
  endpoint = "Designation";
  val:any;
  designationname: any;
  constructor(private sharedService:SharedService,private dialog: MatDialog  ) { }

  ngOnInit(): void {
   this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.data = data;
      this.totalLength=data;
      console.log(this.data);
    });
  }

  Disable(Id:any){
    console.log(Id);
    this.sharedService.getById(this.endpoint,Id).subscribe((data) => {
      this.designationname=data.designationName;
      console.log(this.designationname);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      console.log(result);
      this.openDialog(result);
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.designationname,count:count,value:"Designation"}});

  }
  public data: DesignationVM[] = [];

}
