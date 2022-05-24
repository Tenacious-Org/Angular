import { Component, Input, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';
import { DesignationVM } from 'ViewModels/DesignationVM';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  endpoint = "Designation";

  constructor(private sharedService:SharedService ) { }

  ngOnInit(): void {
   this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.data = data;
      console.log(this.data);

    });
    
  }

  public data: DesignationVM[] = [];

}
