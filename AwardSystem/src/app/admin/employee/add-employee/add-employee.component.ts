import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'Models/Department';
import { Designation } from 'Models/Designation';
import { Organisation } from 'Models/Organisation';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { DialogboxComponent } from 'src/app/dialogbox/dialogbox.component';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/authentication.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  today = new Date();
  pipe = new DatePipe('en-US');
  //changed= this.pipe.transform(this.today ,'YYY-MM-dd');
  month = (this.today.getMonth());
  maxMonth = this.pipe.transform(this.month, 'MM');
  date = (this.today.getDate());
  maxDate = this.pipe.transform(this.date, 'dd');
  year = (this.today.getFullYear() - 18);
  change = (this.year + '-' + this.maxMonth + '-' + this.maxDate);
  organisationID: any;
  departmentID: any;
  designationID: any;
  reportingPersonID: any;
  HRId: any;
  DepartmentID: any;

  constructor(private sharedService: SharedService, private router: Router, private toastService: HotToastService, private dialog: MatDialog) { }
  imgsrc = '';
  imageError = "";
  isImageSaved: boolean = false;
  cardImageBase64 = "";
  error: any = '';


  Employee: any = {
    id: 0,
    aceid: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: Date,
    gender: '',
    image: '',
    imageName: '',
    imageString: this.cardImageBase64,
    organisationId: 0,
    departmentId: 0,
    designationId: 0,
    reportingPersonId: 0,
    hrID: 0,
    password: '',
    addedBy: 0,
    addedOn: Date.now
  }

  organisations: Organisation[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  reportingPersonList: any;
  hrList: any;
  SelectOrganisation: any = 0;
  SelectDepartment: any = 0;
  SelectDesignation: any = 0;
  endpoint = "Organisation";
  endpoint1 = "Employee";
  endpoint2 = "Designation";
  DesignationName:any;
  public filteredData: any[] = [];

  ngOnInit(): void {
    if (!AuthenticationService.GetData("Admin")) {
      this.router.navigateByUrl("")
    }
    this.sharedService.GetAll(this.endpoint).subscribe(data => {
      this.organisations = data;
    });
  }

  onSelectOrganisation() {
    this.sharedService.GetDepartmentByOrganisationId(this.SelectOrganisation).subscribe(data => {
      this.departments = data;
    });
  }

  onSelectDepartment() {
    this.sharedService.GetDesignationByDepartmentId(this.SelectDepartment).subscribe(data => {
      this.designations = data;
    });
    
  }
  onSelectDesignation(){
    this.sharedService.GetById(this.endpoint2,this.SelectDesignation).subscribe(data => {
        this.DesignationName=data.designationName.toLowerCase();
        if(this.DesignationName=='hr'){
          this.sharedService.GetEmployeeByVpDesignation().subscribe(data => {
            this.reportingPersonList = data;
            this.hrList = data;
          });
        }
        if(this.DesignationName!='hr'){
          this.sharedService.GetReportingPersonByDepartmentId(this.SelectDepartment).subscribe(data => {
            this.reportingPersonList = data;
          });
          this.sharedService.GetHrByDepartmentId(this.SelectDepartment).subscribe(data => {
            this.hrList = data;
          });
        }
    }); 
  }

  OnSubmit() {
    this.sharedService.Add(this.endpoint1, this.Employee).subscribe({
      next: (res) => { res ? this.showToast() : null },
      error: (error) => this.error = error.error.message
    })
  }
  showToast() {
    this.toastService.success('Employee Added Succesfully!',
      {
        autoClose: true,
        dismissible: true,
        icon: '❎',
      })
    this.router.navigate(['/admin/employee']);

  }

  CheckName(OrganisationId: any, DepartmentId: any, DesignationId: any, reportingPersonId: any, hrID: any) {
    this.organisationID = OrganisationId;
    this.departmentID = DepartmentId;
    this.designationID = DesignationId;
    this.reportingPersonID = reportingPersonId;
    this.HRId = hrID;

  }
  changeDate() {
    document.getElementById("dob")?.setAttribute("max", this.change);
  }

  ImageConversion(fileInput: any) {
    var x: any = document.getElementById("image");
    var file = x.files[0];
    if ('name' in file) {
      this.Employee.imageName = file.name;
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

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imgsrc = e.target.result;
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/png;base64,", "");
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/jpg;base64,", "");
          this.cardImageBase64 = this.cardImageBase64.replace("data:image/jpeg;base64,", "");
          this.Employee.imageString = this.cardImageBase64;
          this.isImageSaved = true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } return false
  }

}
