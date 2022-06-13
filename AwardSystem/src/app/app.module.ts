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




import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MoreCommentsComponent } from './more-comments/more-comments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardPostComponent } from './card-post/card-post.component';

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
import { ViewEmployeeComponent } from './admin/employee/view-employee/view-employee.component';
import { ApproverComponent } from './approver/approver.component';
import { ApproverApprovalComponent } from './approver/approver-approval/approver-approval.component';
import { LoginComponent } from './login/login.component';


import { RequesterComponent } from './requester/requester.component';
import { RequesterAddRequestComponent } from './requester/requester-add-request/requester-add-request.component';
import { RequesterViewComponent } from './requester/requester-view/requester-view.component';
import { HrComponent } from './hr/hr.component';
import { HrPublishComponent } from './hr/hr-publish/hr-publish.component';
import { HrYettopublishComponent } from './hr/hr-yettopublish/hr-yettopublish.component';

import{FormsModule} from '@angular/forms';
import { RequestComponent } from './requester/request/request.component';
import { ProfileComponent } from './profile/profile.component';
import { ApproverARComponent } from './approver/approver-acceptreject/approver-ar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RejectionReasonComponent } from './approver/rejection-reason/rejection-reason.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';






@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HomePageComponent,
    MoreCommentsComponent,
    CardPostComponent,

    LoginComponent,


    AdminComponent,
    


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
    ViewEmployeeComponent,
    ApproverComponent,
    ApproverApprovalComponent,





 RequesterComponent,
 RequesterAddRequestComponent,
 RequesterViewComponent,
 HrComponent,
 HrPublishComponent,
 HrYettopublishComponent,
 RequestComponent,
 ProfileComponent,
 ApproverARComponent,
 RejectionReasonComponent,
 SidebarComponent,
 HomeCardComponent,
 DialogboxComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
