import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { DesignationVM } from 'ViewModels/DesignationVM';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  totalLength: any;
  page: number = 1;
  endpoint = "Designation";
  searchValue='';
  public filteredData: any[] = [];
  designationname: any;
  constructor(private sharedService:SharedService,private dialog: MatDialog,private router:Router  ) { }

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
      this.designationname=data.designationName;
      console.log(this.designationname);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      console.log(result);
      this.openDialog(result);
      this.ngOnInit()
      //setTimeout(()=> { this.ngOnInit()},1000)
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.designationname,count:count,value:"Designation"}});

  }
  public data: DesignationVM[] = [];

  dialogDisable(id:any){
    let dialogRef =this.dialog.open(DialogboxComponent,{data:{value:"disable"}})
    dialogRef.afterClosed().subscribe(value => {
      if(value!=undefined){
        this.Disable(id);
      }
    });
  }
  Search(value:string){
		this.data=this.filteredData.filter(item =>
		item.designationName.toLowerCase().includes(value.toLowerCase()))
		this.page=1;
	}



}
