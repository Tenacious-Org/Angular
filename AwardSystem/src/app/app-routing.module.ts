import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
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
import { ApproverAddrequestComponent } from './approver/approver-addrequest/approver-addrequest.component';
import { ApproverApprovalComponent } from './approver/approver-approval/approver-approval.component';
import { ApproverDashboardComponent } from './approver/approver-dashboard/approver-dashboard.component';
import { ApproverHomepageComponent } from './approver/approver-homepage/approver-homepage.component';
import { ApproverMyawardsComponent } from './approver/approver-myawards/approver-myawards.component';
import { ApproverComponent } from './approver/approver.component';
import { CardPostComponent } from './card-post/card-post.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MoreCommentsComponent } from './more-comments/more-comments.component';

import { RequesterComponent } from './requester/requester.component';
import { RequesterAddRequestComponent } from './requester/requester-add-request/requester-add-request.component';
import { RequesterMyawardsComponent } from './requester/requester-myawards/requester-myawards.component';
import { RequesterRequestComponent } from './requester/requester-request/requester-request.component';
import { RequesterSidebarComponent } from './requester/requester-sidebar/requester-sidebar.component';
import { RequesterViewComponent } from './requester/requester-view/requester-view.component';
import { HrComponent } from './hr/hr.component';
import { HrAddRequestComponent } from './hr/hr-add-request/hr-add-request.component';
import { HrPublishComponent } from './hr/hr-publish/hr-publish.component';
import { HrRequestComponent } from './hr/hr-request/hr-request.component';
import { HrRequestViewComponent } from './hr/hr-request-view/hr-request-view.component';
import { HrSidebarComponent } from './hr/hr-sidebar/hr-sidebar.component';
import { HrYettopublishComponent } from './hr/hr-yettopublish/hr-yettopublish.component';
import { HrAwardComponent } from './hr/hr-award/hr-award.component';
import { RequesterHomepageComponent } from './requester/requester-homepage/requester-homepage.component';
import { HrHomepageComponent } from './hr/hr-homepage/hr-homepage.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './requester/request/request.component';
import { ApproverViewComponent } from './approver/approver-view/approver-view.component';
import { RequesterRejectComponent } from './requester/requester-reject/requester-reject.component';


import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { ApproverARComponent } from './approver/approver-acceptreject/approver-ar.component';


const routes: Routes = [

  {path:'layout' , component:LayoutComponent},
  {path:'admin-sidebar', component:AdminSidebarComponent},
  {path:'login', component:LoginComponent},


  {path:'employee', component:EmployeeComponent},
  {path:'add-employee', component:AddEmployeeComponent},

  {path:'awards', component:AwardsComponent},
  {path:'add-awards', component:AddAwardsComponent},
  {path:'edit-award', component:EditAwardComponent},
  {path:'view-award', component:ViewAwardComponent},

  {path:'department', component:DepartmentComponent},
  {path:'add-department', component:AddDepartmentComponent},
  {path:'edit-department', component:EditDepartmentComponent},


  {path:'designation', component:DesignationComponent},
  {path:'add-designation', component:AddDesignationComponent},
  {path:'edit-designation', component:EditDesignationComponent},


  {path:'organisation', component:OrganisationComponent},
  {path:'add-organisation', component:AddOrganisationComponent},
  {path:'edit-organisation', component:EditOrganisationComponent},

  {path:'approver', component:ApproverComponent},
  {path:'approver-addrequest', component:ApproverAddrequestComponent},
  {path:'approver-approval', component:ApproverApprovalComponent},
  {path:'approver-dashboard', component:ApproverDashboardComponent},
  {path:'approver-homepage', component:ApproverHomepageComponent},
  {path:'approver-myawards', component:ApproverMyawardsComponent},
  {path:'approver-homepage', component:ApproverHomepageComponent},
  {path:'approver-view', component:ApproverViewComponent},
  {path:'approver-acceptreject', component:ApproverARComponent},

  






  {path:'footer' , component:FooterComponent},
  {path:'homepage' , component:HomePageComponent},
  {path:'morecomments' , component:MoreCommentsComponent},
  {path:'cardpost' , component:CardPostComponent},
  {path:'request' , component:RequestComponent},
  {path:'profile' , component:RequestComponent},
 



  {path:'requester' , component:RequesterComponent},
  {path:'requester-add-request' , component:RequesterAddRequestComponent},
  {path:'requester-myawards' , component:RequesterMyawardsComponent},
  {path:'requester-request' , component:RequesterRequestComponent},
  {path:'requester-sidebar' , component:RequesterSidebarComponent},
  {path:'requester-view' , component:RequesterViewComponent},
  {path:'requester-homepage' , component:RequesterHomepageComponent},
  {path:'requester-reject' , component:RequesterRejectComponent},

  {path:'hr' , component:HrComponent},
  {path:'hr-add-request' , component:HrAddRequestComponent},
  {path:'hr-publish' , component:HrPublishComponent},
  {path:'hr-request' , component:HrRequestComponent},
  {path:'hr-request-view' , component:HrRequestViewComponent},
  {path:'hr-sidebar' , component:HrSidebarComponent},
  {path:'hr-yettopublish' , component:HrYettopublishComponent},
  {path:'hr-award' , component:HrAwardComponent},
  {path:'hr-homepage' , component:HrHomepageComponent},


   {path:'', component:AddDepartmentComponent},




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
