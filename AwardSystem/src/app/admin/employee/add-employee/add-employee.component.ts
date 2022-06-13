import { Component, OnInit } from '@angular/core';
import { Department } from 'Models/Department';
import { Designation } from 'Models/Designation';
import { Employee } from 'Models/Employee';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private sharedService:SharedService) { }
  imgsrc='';
  imageError = "";
  isImageSaved: boolean = false;
  cardImageBase64 = "";

  Employee : any = {
    id : 0,
    aceid : '',
    firstName : '',
    lastName : '',
    email : '',
    dob : '',
    gender:'',
    image:'',
    imageName:'',
    imageString : this.cardImageBase64,
    organisationId : 0,
    departmentId : 0,
    designationId : 0,
    reportingPersonId : 0,
    hrID : 0,
    password : '',
    addedBy : 1,
    addedOn : Date.now
  }



  organisations: Organisation[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  employeeData : Employee[]=[];
  SelectOrg: any = 0;
  SelectDep: any = 0;

  endpoint = "Organisation";
  endpoint1 = "Employee";

  ngOnInit(): void {
    this.sharedService.getAll(this.endpoint).subscribe(data=>{
      this.organisations=data;
      console.log(this.organisations);
    });


  }

  onSelectDep(){
    this.sharedService.getDepartmentByOrganisation(this.SelectOrg).subscribe(data=>{
      this.departments = data;
      console.log(this.departments);
    });
   }

   onSelectDes(){
    this.sharedService.getDesignationByDepartment(this.SelectDep).subscribe(data=>{
      this.designations = data;
      console.log(this.designations);
    });
    this.sharedService.getReportingPersonByDepartment(this.SelectDep).subscribe(data=>{
      this.employeeData = data;
      console.log(this.employeeData);
    });
   }

   OnSubmit(){
     console.log(this.Employee)
    this.sharedService.add(this.endpoint1,this.Employee).subscribe(data=>{
      console.log(data);
    });
  }



  ImageConversion(fileInput:any){
    var x:any=document.getElementById("image");
    var file=x.files[0];
    if('name' in file){
      this.Employee.imageName=file.name;
      console.log(this.Employee.imageName);
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
          this.Employee.imageString=this.cardImageBase64;
          this.isImageSaved = true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }

}
