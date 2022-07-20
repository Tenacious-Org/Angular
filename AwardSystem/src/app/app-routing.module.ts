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
import { ApproverComponent } from './approver/approver.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { MoreCommentsComponent } from './more-comments/more-comments.component';

import { RequesterComponent } from './requester/requester.component';

import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './requester/request/request.component';


import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { RejectionReasonComponent } from './approver/rejection-reason/rejection-reason.component';
import { EditEmployeeComponent } from './admin/employee/edit-employee/edit-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { AwardViewComponent } from './award-view/award-view.component';
import { AwardListComponent } from './award-list/award-list.component';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { AdminGuard } from './admin.guard';
import { AdminChildGuard } from './admin-child.guard';
// import { HotToastModule } from '@ngneat/hot-toast';


const routes: Routes = [


    {
      path:'admin',
      canActivate:[AdminGuard],
      children:[
        {
          path:'',
          component:AdminComponent
        },
        {
          path:'',
          canActivateChild:[AdminChildGuard],
          children:[
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
            {path:'employee', component:EmployeeComponent},
            {path:'add-employee', component:AddEmployeeComponent},
            {path:'edit-employee/:id', component:EditEmployeeComponent},
            {path:'organisation', component:OrganisationComponent},
            {path:'add-organisation', component:AddOrganisationComponent},
            {path:'edit-organisation/:id', component:EditOrganisationComponent},
          ]
        }
      ]
    },

  {path:'layout' , component:LayoutComponent},
  {path:'login', component:LoginComponent},
  {path:'sidebar', component:SidebarComponent},
  {path:'profile/:id' , component:ProfileComponent},
  {path:'forgot-password' , component:ForgotPasswordComponent},
  {path:'comments/:id',component:CommentsPageComponent},

  


 

  

  



  {path:'approver', component:ApproverComponent},
 
  {path:'rejection-reason/:id' , component:RejectionReasonComponent},

  {path:'footer' , component:FooterComponent},
  {path:'morecomments/:id' , component:MoreCommentsComponent},
  {path:'homecard/:id' , component:HomeCardComponent},

 

  {path:'request/:id' , component:RequestComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'dialogbox', component:DialogboxComponent},


  {path:'awardview/:id/:id1',component:AwardViewComponent},
  {path:'awardlist/:id',component:AwardListComponent},
  {path:'',redirectTo:'homecard/0', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],

   
  exports: [RouterModule]
})

export class AppRoutingModule { }



