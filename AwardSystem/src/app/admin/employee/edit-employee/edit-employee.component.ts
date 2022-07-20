import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Department } from 'Models/Department';
import { Designation } from 'Models/Designation';
import { Employee } from 'Models/Employee';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
import { DatePipe, formatDate } from '@angular/common';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  today = new Date();
  pipe = new DatePipe('en-US');
  //changed= this.pipe.transform(this.today ,'YYY-MM-dd');
  month = (this.today.getMonth());
  maxMonth = this.pipe.transform(this.month , 'MM');
  date = (this.today.getDate());
  maxDate = this.pipe.transform(this.date , 'dd');
  year = (this.today.getFullYear()-18);
  change = (this.year + '-' + this.maxMonth + '-' +this.maxDate);
  imageError = "";
  imgsrc='';
  isImageSaved: boolean = false;
  cardImageBase64 = "";
  Id:any=0;
  data:any;
  selectedOrganisation:any;
  selectedDepartment:any;
  selectedDesignation:any;
  selectedReportingPerson:any;
  selectedHr:any;
  organisations: Organisation[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  reportingPersonList : any;
  SelectOrg: any = 0;
  SelectDep: any = 0;

  endpoint = "Organisation";
  endpoint1 = "Employee";
  endpoint2 = "Department";
  hrList: any;
  organisationID: any;
  departmentID: any;
  designationID: any;
  reportingPersonID: any;
  HRId: any;
  Dob: any;
  error: any;
  constructor(private sharedService:SharedService, private router:ActivatedRoute, private routing:Router,private toastService: HotToastService) { }

  ngOnInit(): void {
    if(!AuthenticationService.GetData("Admin")){
      this.routing.navigateByUrl("")
    }
    this.router.params.subscribe(params => {
      this.Id = params['id'];
     this.sharedService.GetById(this.endpoint1,this.Id).subscribe((result) => {
          this.data = result;
          console.log(this.Id);
          console.log(this.data);
          if(this.data.image!=""  ){
            this.imgsrc='data:image/jpg;base64,'+ this.data.image;
          }
          this.SelectOrg=this.data.organisationId;
          this.SelectDep=this.data.departmentId;
          this.selectedDesignation=this.data.designationId;
          this.selectedReportingPerson=this.data.reportingPersonId;
          this.selectedHr=this.data.hrId;
          this.Dob=formatDate(this.data.dob,'YYYY-MM-dd','en')
          console.log(this.SelectOrg);
          console.log(this.selectedHr);
          console.log(this.selectedReportingPerson);
          this.sharedService.GetDepartmentByOrganisationId(this.SelectOrg).subscribe(data=>{
            this.departments = data;
            console.log(this.departments);
          });
           this.sharedService.GetReportingPersonByDepartmentId(this.SelectDep).subscribe(data=>{
          this.reportingPersonList = data;
          console.log(this.reportingPersonList);
        });
        this.sharedService.GetHrByDepartmentId(this.SelectDep).subscribe(data=>{
          this.hrList = data;
          console.log(this.hrList);
        });
        this.sharedService.GetDesignationByDepartmentId(this.SelectDep).subscribe(data=>{
          this.designations = data;
          console.log(this.designations);
        });
        });
      });
      this.sharedService.GetAll(this.endpoint).subscribe(data=>{
        this.organisations=data;
      });

  }
  onSelectOrg(){
    this.sharedService.GetDepartmentByOrganisationId(this.SelectOrg).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }

   onSelectDep(){

    this.sharedService.GetReportingPersonByDepartmentId(this.SelectDep).subscribe(data=>{
      this.reportingPersonList = data;
      console.log(this.reportingPersonList);
    });
    this.sharedService.GetHrByDepartmentId(this.SelectDep).subscribe(data=>{
      this.hrList = data;
      console.log(this.hrList);
    });
    this.sharedService.GetDesignationByDepartmentId(this.SelectDep).subscribe(data=>{
      this.designations = data;
      console.log(this.designations);
    });
   }

   OnSubmit(){
    console.log(this.Dob)
     this.data.dob=this.Dob;
     console.log(this.data)
     if(this.data.imageString==null && this.data.image!=null ){
      this.data.imageString=this.data.image;
      
    }
    this.sharedService.Edit(this.endpoint1,this.data).subscribe({
      next:(res) => { console.log(res), res?this.showToast():null },
      error: (error) => this.error = error.error.message
    })
}
showToast() {
  this.toastService.success('Employee updated Successfully!',
  {
    autoClose: true,
    dismissible: true,
    icon: '❎',
  })
  this.routing.navigate(['/admin/employee']);

}



  ImageConversion(fileInput:any){
    var x:any=document.getElementById("image");
    var file=x.files[0];
    if('name' in file){
      this.data.imageName=file.name;
      console.log(this.data.imageName);
    }
    this.imageError = "";
    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      console.log(fileInput.target.files[0].type)

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imgsrc=e.target.result;
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.cardImageBase64= this.cardImageBase64.replace("data:image/png;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpg;base64,", "");
          this.cardImageBase64= this.cardImageBase64.replace("data:image/jpeg;base64,", "");
          this.data.imageString=this.cardImageBase64;
          this.isImageSaved = true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }
  changeDate(){
    document.getElementById("dob")?.setAttribute("max",this.change);
  }
  CheckName(OrganisationId:any,DepartmentId: any,DesignationId:any,reportingPersonId:any,hrID:any)
  {
    this.organisationID=OrganisationId;
    this.departmentID=DepartmentId;
    this.designationID=DesignationId;
    this.reportingPersonID=reportingPersonId;
    this.HRId=hrID;
 
  }

}
