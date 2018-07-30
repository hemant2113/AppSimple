
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { HttpModule, Jsonp,Request} from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
// import {FlashMessageModule} from 'angular-flash-message';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { UserListService } from './user-list.service';
import { NurtureService } from './services/nurture.service';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { AddNurtureComponent } from './add-nurture/add-nurture.component';
import { NurtureViewComponent } from './nurture-view/nurture-view.component';
import { CompanyNurtureComponent } from './company-nurture/company-nurture.component';
import { CompanyHeaderComponent } from './company-header/company-header.component';
import { ComComponent } from './com/com.component';
import { TokenComponent } from './token/token.component';



import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
// import { OverviewComponent } from './overview/overview.component';
import { NurtureComponent } from './nurture/nurture.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { EditNurtureComponent } from './edit-nurture/edit-nurture.component';
import { HeaderComponent } from './header/header.component';



import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { EditNurtureCompanyComponent } from './company/edit-nurture-company/edit-nurture-company.component';
import { PasswordChangeComponent } from './company/password-change/password-change.component';
import { Error404Component } from './error404/error404.component';
import { CheckingComponent } from './checking/checking.component';






const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard',

  component: DashboardComponent ,
  data: {
    title: 'Dash page'
  }},
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createuser', component: CompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'manage-nurture/:id', component: NurtureComponent },
  { path: 'user-manage/:id', component: UserManageComponent },
  { path: 'add-nurture', component: AddNurtureComponent },
  { path: 'nurture-edit/:id', component: EditNurtureComponent },
  { path: 'nurture-view/:id', component: NurtureViewComponent },
  { path: 'nurture-view/:id/:url', component: NurtureViewComponent },
  { path: 'company-dashboard/:search_id', component: CompanyDashboardComponent },
  { path: 'company-nurture/:search_id', component: CompanyNurtureComponent },
  


  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'admin/change-password', component: ChangePasswordComponent },

  { path: 'company/change-password', component: PasswordChangeComponent },





  { path: 'company/:domain_name', component: ComComponent },
  { path: 'spiel/:nurture_name', component: TokenComponent, data: { title: 'My Calendar' }},
  { path: 'spiel/:nurture_name/:track_name', component: TokenComponent},



  
  { path: 'edit-nurture-company/:id', component: EditNurtureCompanyComponent },



  { path: 'error', component: Error404Component },
  // {path: '**', redirectTo: '/error'}

  { path: 'checkingjjjjjj', component: CheckingComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    CompanyComponent,
    NurtureViewComponent,
    EditCompanyComponent,
    NurtureComponent,
    UserManageComponent,
  
    AddNurtureComponent,
    EditNurtureComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,

    CompanyDashboardComponent,
    CompanyNurtureComponent,
    CompanyHeaderComponent,
    ComComponent,
    TokenComponent,
    OverviewComponent,
    EditNurtureCompanyComponent,
    PasswordChangeComponent,
    Error404Component,
    CheckingComponent
],
  imports: [
   
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    JsonpModule,
    FormsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SimpleNotificationsModule.forRoot()


  ],
  exports: [ModalModule,BrowserModule],
  providers: [DataService, UserListService,NurtureService,CommonService,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }