import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'Models/Department';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  roles: any;
  endpoint2="Role";
  constructor(private sharedService:SharedService, private router:ActivatedRoute, private routing:Router,private toastService: HotToastService) { }
  Id:any=0;
  data:any;
  departments : Department[]=[];
  selectedDepartment:any;
  selectedRole:any;
  endpoint="Department";
  endpoint1="Designation";

   ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.Id = params['id'];
     this.sharedService.getById(this.endpoint1,this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.data);
          this.selectedDepartment=this.data.departmentId;
          this.selectedRole=this.data.roleId;
          console.log(this.selectedRole);
        });
      });
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.departments=data;
    });    
    this.sharedService.getAll(this.endpoint2).subscribe(data=>{
      this.roles=data;
      console.log(this.roles);
    });
   }

  OnSubmit(){
    this.sharedService.edit(this.endpoint1,this.data).subscribe(data=>{
      console.log(data);
      this.showToast();
    });
}
showToast() {
  this.toastService.success('Successfully updated!',
  {
    autoClose: true,
    dismissible: true,
  })
  this.routing.navigate(['/designation']);

}


}
