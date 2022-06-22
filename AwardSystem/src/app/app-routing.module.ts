import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAwardsComponent } from './admin/awards/add-awards/add-awards.component';
import { AwardsComponent } from './admin/awards/awards.component';
import { EditAwardComponent } from './admin/awards/edit-award/edit-award.component';
import { ViewAwardComponent } from './admin/awards/view-award/view-award.component';
import { AddDepartmentComponent } from './admin/department/add-department/add-department.component';
import { DepartmentComponent } from './admin/department/department.component';
import { EditDepartmentComponent } from './admin/department/edit-department/edit-department.component';
import { AddDesignationComponent } from './admin/designation/add-designation/add-designation.component';
import { DesignationComponent } from './admin/designation/designation.component';
import { EditDesignationComponent } from './admin/designation/edit-designation/edit-designation.component';
import { AddOrganisationComponent } from './admin/organisation/add-organisation/add-organisation.component';
import { EditOrganisationComponent } from './admin/organisation/edit-organisation/edit-organisation.component';
import { OrganisationComponent } from './admin/organisation/organisation.component';
import { ApproverApprovalComponent } from './approver/approver-approval/approver-approval.component';
import { ApproverComponent } from './approver/approver.component';
import { CardPostComponent } from './card-post/card-post.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MoreCommentsComponent } from './more-comments/more-comments.component';

import { RequesterComponent } from './requester/requester.component';
import { RequesterAddRequestComponent } from './requester/requester-add-request/requester-add-request.component';
import { RequesterViewComponent } from './requester/requester-view/requester-view.component';
import { HrComponent } from './hr/hr.component';
import { HrPublishComponent } from './hr/hr-publish/hr-publish.component';
import { HrYettopublishComponent } from './hr/hr-yettopublish/hr-yettopublish.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './requester/request/request.component';


import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { ApproverARComponent } from './approver/approver-acceptreject/approver-ar.component';
import { RejectionReasonComponent } from './approver/rejection-reason/rejection-reason.component';
import { ViewEmployeeComponent } from './admin/employee/view-employee/view-employee.component';
import { EditEmployeeComponent } from './admin/employee/edit-employee/edit-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {path:'layout' , component:LayoutComponent},
  {path:'login', component:LoginComponent},
  {path:'sidebar', component:SidebarComponent},

  {path:'employee', component:EmployeeComponent},
  {path:'add-employee', component:AddEmployeeComponent},
  {path:'edit-employee/:id', component:EditEmployeeComponent},
  {path:'employee/:id', component:ViewEmployeeComponent},


  {path:'awards', component:AwardsComponent},
  {path:'add-awards', component:AddAwardsComponent},
  {path:'edit-award/:id', component:EditAwardComponent},
  {path:'awards/:id', component:ViewAwardComponent},

  {path:'department', component:DepartmentComponent},
  {path:'add-department', component:AddDepartmentComponent},
  {path:'edit-department/:id', component:EditDepartmentComponent},

  {path:'designation', component:DesignationComponent},
  {path:'add-designation', component:AddDesignationComponent},
  {path:'edit-designation/:id', component:EditDesignationComponent},

  {path:'organisation', component:OrganisationComponent},
  {path:'add-organisation', component:AddOrganisationComponent},
  {path:'edit-organisation/:id', component:EditOrganisationComponent},

  {path:'approver', component:ApproverComponent},
  {path:'approver-approval', component:ApproverApprovalComponent},
  {path:'approver-acceptreject/:id', component:ApproverARComponent},
  {path:'rejection-reason/:id' , component:RejectionReasonComponent},

  {path:'footer' , component:FooterComponent},
  {path:'homepage' , component:HomePageComponent},
  {path:'morecomments/:id' , component:MoreCommentsComponent},
  {path:'cardpost' , component:CardPostComponent},
  {path:'homecard' , component:HomeCardComponent},

  {path:'profile/:id' , component:ProfileComponent},

  {path:'requester-request' , component:RequestComponent},
  {path:'requester-add-request' , component:RequesterAddRequestComponent},

  {path:'requester-view' , component:RequesterViewComponent},
  {path:'requester-view/:id' , component:RequesterViewComponent},
  {path:'hr' , component:HrComponent},
  {path:'hr-publish' , component:HrPublishComponent},
  {path:'hr-yettopublish/:id' , component:HrYettopublishComponent},

  {path: 'dashboard', component:DashboardComponent},


  {path:'', component:OrganisationComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
