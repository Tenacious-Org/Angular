import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'Models/Department';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.css']
})
export class EditDesignationComponent implements OnInit {
  roles: any;
  endpoint2="Role";
  error: any;
  departmentID: any;
  roleID: any;
  constructor(private sharedService:SharedService, private router:ActivatedRoute, private routing:Router,private toastService: HotToastService) { }
  Id:any=0;
  data:any;
  departments : Department[]=[];
  selectedDepartment:any;
  selectedRole:any;
  endpoint="Department";
  endpoint1="Designation";

   ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.routing.navigateByUrl("")
    }
    this.router.params.subscribe(params => {
      this.Id = params['id'];
     this.sharedService.GetById(this.endpoint1,this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.data);
          this.selectedDepartment=this.data.departmentId;
          this.selectedRole=this.data.roleId;
          console.log(this.selectedRole);
        });
      });
    this.sharedService.GetAll(this.endpoint).subscribe(data=>{
      this.departments=data;
    });    
    this.sharedService.GetAll(this.endpoint2).subscribe(data=>{
      this.roles=data;
      console.log(this.roles);
    });
   }

  OnSubmit(){
    this.sharedService.Edit(this.endpoint1,this.data).subscribe({
      // console.log(data);
      // this.showToast();
      next: (res) => { console.log(res),res?this.showToast():null },
      error: (error) => this.error = error.error.message
    });
}
showToast() {
  this.toastService.success('Designation updated Successfully!',
  {
    autoClose: true,
    dismissible: true,
  })
  this.routing.navigate(['/designation']);

}
CheckName(DepartmentId: any,RoleId:any)
  {
    this.departmentID=DepartmentId;
    this.roleID=RoleId;
  }

}
