import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from'@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ActivatedRoute, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';




import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { MoreCommentsComponent } from './more-comments/more-comments.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminComponent } from './admin/admin.component';

import { OrganisationComponent } from './admin/organisation/organisation.component';
import { EditOrganisationComponent } from './admin/organisation/edit-organisation/edit-organisation.component';
import { AddOrganisationComponent } from './admin/organisation/add-organisation/add-organisation.component';


import { DepartmentComponent } from './admin/department/department.component';
import { AddDepartmentComponent } from './admin/department/add-department/add-department.component';
import { EditDepartmentComponent } from './admin/department/edit-department/edit-department.component';
import { DesignationComponent } from './admin/designation/designation.component';
import { AddDesignationComponent } from './admin/designation/add-designation/add-designation.component';
import { EditDesignationComponent } from './admin/designation/edit-designation/edit-designation.component';

import { AwardsComponent } from './admin/awards/awards.component';
import { AddAwardsComponent } from './admin/awards/add-awards/add-awards.component';
import { EditAwardComponent } from './admin/awards/edit-award/edit-award.component';

import { ViewAwardComponent } from './admin/awards/view-award/view-award.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './admin/employee/edit-employee/edit-employee.component';
import { ApproverComponent } from './approver/approver.component';
import { LoginComponent } from './login/login.component';
import{FormsModule} from '@angular/forms';
import { RequesterAddRequestComponent } from './requester/requester-add-request/requester-add-request.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RejectionReasonComponent } from './approver/rejection-reason/rejection-reason.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HotToastModule } from '@ngneat/hot-toast';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AwardViewComponent } from './award-view/award-view.component';
import { AwardListComponent } from './award-list/award-list.component';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { AdminChildGuard } from './admin-child.guard';
import { AdminGuard } from './admin.guard';
import { InvalidComponent } from './invalid/invalid.component';


//import { TooltipModule } from 'ng2-tooltip-directive';







@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    MoreCommentsComponent,

    LoginComponent,
    CommentsPageComponent,

    AdminComponent,
    InvalidComponent,
    

    RequesterAddRequestComponent,
    OrganisationComponent,
    AddOrganisationComponent,
    EditOrganisationComponent,


    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,

    DesignationComponent,
    AddDesignationComponent,
    EditDesignationComponent,

    AwardsComponent,
    AddAwardsComponent,
    EditAwardComponent,
    ViewAwardComponent,


    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ApproverComponent,





 ProfileComponent,
 RejectionReasonComponent,
 SidebarComponent,
 HomeCardComponent,
 DialogboxComponent,
 DashboardComponent,

 AppComponent,
   ForgotPasswordComponent,
   AwardViewComponent,
   AwardListComponent,
   InvalidComponent,







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    //TooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    MatPaginatorModule,
    HotToastModule.forRoot(),
    MatSelectModule,
    NgChartsModule,
    
    



  ],
  providers: [AdminChildGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
