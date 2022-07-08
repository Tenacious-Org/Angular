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

  constructor(private sharedService:SharedService,private dialog: MatDialog ,private router:Router) { }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.router.navigateByUrl("")
    }

   this.sharedService.getAll(this.endpoint).subscribe(data=>{
   this.data=data;
   this.totalLength=data;
   console.log(this.data);
   });

  }

  Disable(Id:any){
    console.log(Id);
    this.sharedService.getById(this.endpoint,Id).subscribe((data) => {
      this.awardname=data.awardName;
      console.log(this.awardname);
    this.sharedService.disable(this.endpoint,Id).subscribe((result) => {
      console.log(result);
      this.openDialog(result);
      setTimeout(()=> { this.ngOnInit()}, 1000)
    });
  });
  }
  openDialog(count:any){

    this.dialog.open(DialogboxComponent,{data:{name:this.awardname,count:count,value:"Awardtype"}});

  }

}
