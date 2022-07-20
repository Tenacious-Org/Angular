import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { SharedService } from 'src/app/shared.service';
import { Awards } from 'Models/Awards';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})

export class AwardsComponent implements OnInit {
  endpoint="AwardType";
  totalLength: any;
  page: number = 1;
  val:any;
  data:any;
  awardname: any;
  searchValue='';
  public filteredData: any[] = [];

  constructor(private sharedService:SharedService,private dialog: MatDialog ,private router:Router) { }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.router.navigateByUrl("")
    }

   this.sharedService.GetAll(this.endpoint).subscribe(data=>{
   this.data=data;
   this.totalLength=data;
   console.log(this.data);
   });
  }

  Disable(Id:any){
    console.log(Id);
    this.sharedService.GetById(this.endpoint,Id).subscribe((data) => {
      this.awardname=data.awardName;
      console.log(this.awardname);
    this.sharedService.Disable(this.endpoint,Id).subscribe((result) => {
      console.log(result);
      this.openDialog(result);
      this.ngOnInit()
      //setTimeout(()=> { this.ngOnInit()}, 1000)
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.awardname,count:count,value:"Awardtype"}});

  }

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
	 item.awardName.toLowerCase().includes(value.toLowerCase()))
		this.page=1;
	}

}
