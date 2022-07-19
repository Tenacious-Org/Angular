import { Component, Input, OnInit } from '@angular/core';
import { DepartmentVM } from 'ViewModels/DepartmentsVM';
import { SharedService } from 'src/app/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';


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
  constructor(private sharedService:SharedService,private dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.router.navigateByUrl("")
    }
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
      this.ngOnInit()
      //setTimeout(()=> { this.ngOnInit()},1000)
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.departmentname,count:count,value:"Department"}});

  }

  public data: DepartmentVM[] = [];
  dialogDisable(id:any){
    let dialogRef =this.dialog.open(DialogboxComponent,{data:{value:"disable"}})
    dialogRef.afterClosed().subscribe(value => {
      if(value!=undefined){
        this.Disable(id);
      }
    });
  }
}
