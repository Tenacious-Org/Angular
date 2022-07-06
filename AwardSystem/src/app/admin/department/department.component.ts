import { Component, Input, OnInit } from '@angular/core';
import { DepartmentVM } from 'ViewModels/DepartmentsVM';
import { SharedService } from 'src/app/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  totalLength: any;
  page: number = 1;
  endpoint = "Department";
  val:any;
  departmentname: any;
  constructor(private sharedService:SharedService,private dialog: MatDialog ) { }

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
      this.departmentname=data.departmentName;
      console.log(this.departmentname);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      console.log(result);
      this.openDialog(result);
      setTimeout(()=> { this.ngOnInit()},1000)
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.departmentname,count:count,value:"Department"}});

  }

  public data: DepartmentVM[] = [];
}
