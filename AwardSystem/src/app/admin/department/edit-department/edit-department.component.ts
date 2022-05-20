import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
Id:any=0;
data:any;
  constructor(private sharedService:SharedService ,private http:HttpClient , private router:ActivatedRoute) { }
  endpoint="Department";
  endpoint1="Organisation";
    ngOnInit(): void {
      this.router.params.subscribe(params => {
        this.Id = params['id'];
       this.sharedService.getById(this.endpoint,this.Id).subscribe((result) => {
            this.data = result;
            console.log(this.Id);
            console.log(this.data);
          });
        });
      this.sharedService.getAll(this.endpoint1).subscribe(data=>{
        this.organisation=data;
      });
      
  
    }
    public organisation: Organisation[] = [];

    OnSubmit(){
      console.log(this.data)
      this.sharedService.edit(this.endpoint,this.data).subscribe((res) =>{
        console.log(res);
      });
    }
}
