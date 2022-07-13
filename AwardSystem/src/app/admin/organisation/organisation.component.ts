import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Organisation } from 'Models/Organisation';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  endpoint = "Organisation";
  totalLength: any;
  page: number = 1;
  count = 0;
  val: any;
  organisationname: any;
  constructor(private sharedService: SharedService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }
    this.sharedService.getAll(this.endpoint).subscribe(data => {
      this.data = data;
      this.totalLength = data;
      console.log(data)
    });
  }

  Disable(Id: any) {
    console.log(Id);
    this.sharedService.getById(this.endpoint, Id).subscribe((data) => {
      this.organisationname = data.organisationName;
      console.log(this.organisationname);
      this.sharedService.disable(this.endpoint, Id).subscribe((result) => {
        console.log(result);
        this.openDialog(result);
        this.ngOnInit()
        //setTimeout(()=> { this.ngOnInit()},1000)
      });
    });
  }

  openDialog(count: any) {
    this.dialog.open(DialogboxComponent, { data: { name: this.organisationname, count: count, value: "Organisation" } });
  }

  OnSubmit(Id: any) {
    console.log(Id);
    this.sharedService.getById(this.endpoint, Id).subscribe((data) => {
      this.organisationname = data.organisationName;
      console.log(this.organisationname);
      this.openDialog(result);
    });
  }
  // / openDialog(count:any){
  //   this.dialog.open(DialogboxComponent,{data:{name:this.organisationname,value:"Organisation"}});
  // }
  public data: Organisation[] = [];
}

function result(result: any) {
  throw new Error('Function not implemented.');
}

