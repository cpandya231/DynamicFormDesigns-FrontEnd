import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormioAppConfig, FormioModule } from '@formio/angular';
import { CreateFormTemplateComponent } from './forms/create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms/forms-dashboard/forms-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PreviewFormComponent } from './forms/preview-form/preview-form.component';
import { UsersInfoComponent } from './users/users-info/users-info.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { NgbdSortableHeader } from '../app/directives/sort-table-column-directive';
import { GlobalAppIntercepter } from './common/services/global-app-intercepter.service';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { FormWorkflowComponent } from './forms/form-workflow/form-workflow-dashboard.component';
import { DeleteUserAlertComponent } from './users/users-info/delete-user-alert/delete-user-alert.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AppConfig } from './formio-app-config';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { DepartmentDashboardComponent } from './departments/department-dashboard/department-dashboard.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { AddEditWorkflowStateComponent } from './forms/form-workflow/add-edit-workflow-state/add-edit-workflow-state.component';
import { FormManagementComponent } from './forms/form-management/form-management.component';
import { AuditTrailComponent } from './settings/audit-trail/audit-trail.component';
import { SettingsComponent } from './settings/settings.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SystemConfigComponent } from './settings/system-config/system-config.component';
import { PasswordConfigComponent } from './settings/system-config/password-config/password-config.component';
import { UsernameConfigComponent } from './settings/system-config/username-config/username-config.component';
import { SessionConfigComponent } from './settings/system-config/session-config/session-config.component';
import { SmtpConfigComponent } from './settings/system-config/smtp-config/smtp-config.component';
import { GlobalConfigComponent } from './settings/system-config/global-config/global-config.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ToastrModule } from 'ngx-toastr';
import { ValidateUserComponent } from './common/components/validate-user/validate-user.component';
import { FillFormComponent } from './forms/fill-form/fill-form.component';
import { MaterialExampleModule } from './material/material.module';
import { UserFormsDashboardComponent } from './forms/user-forms-dashboard/user-forms-dashboard.component';
import { UserFormsInProgressComponent } from './forms/user-forms-in-progress/user-forms-in-progress.component';
import { UserFormsInProgressDataComponent } from './forms/user-forms-in-progress/user-forms-in-progress-data/user-forms-in-progress-data.component';
import { CommentsComponent } from './forms/fill-form/comments/comments.component';
import { DisplayWorkflowStatusComponent } from './common/display-workflow-status/display-workflow-status.component';
import { MasterFormsComponent } from './forms/master-forms/master-forms.component';
import { EntryAuditDataComponent } from './forms/entry-audit-data/entry-audit-data.component';
import { WatchTowerComponent } from './watch-tower/watch-tower.component';
import { SecurityConfigComponent } from './settings/system-config/security-config/security-config.component';
import { AgGridModule } from 'ag-grid-angular';
import { CtaButtonsRenderer } from './forms/user-forms-in-progress/user-forms-in-progress-data/cta-buttons.renderer.component';
import { ReportDashboardComponent } from './create-report/report-dashboard.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormTemplateComponent,
    FormsDashboardComponent,
    LoginComponent,
    WelcomeComponent,
    NavbarComponent,
    UsersComponent,
    RolesComponent,
    NgbdSortableHeader,
    PreviewFormComponent,
    CreateUserComponent,
    UsersInfoComponent,
    CreateRoleComponent,
    FormWorkflowComponent,
    DeleteUserAlertComponent,
    DepartmentsComponent,
    CreateDepartmentComponent,
    DepartmentDashboardComponent,
    EditDepartmentComponent,
    AddEditWorkflowStateComponent,
    FormManagementComponent,
    AuditTrailComponent,
    SettingsComponent,
    SystemConfigComponent,
    PasswordConfigComponent,
    UsernameConfigComponent,
    SessionConfigComponent,
    SmtpConfigComponent,
    GlobalConfigComponent,
    ValidateUserComponent,
    FillFormComponent,
    UserFormsDashboardComponent,
    UserFormsInProgressComponent,
    UserFormsInProgressDataComponent,
    CommentsComponent,
    DisplayWorkflowStatusComponent,
    MasterFormsComponent,
    EntryAuditDataComponent,
    WatchTowerComponent,
    SecurityConfigComponent,
    CtaButtonsRenderer,
    ReportDashboardComponent,
    CreateReportComponent,
    ViewReportsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormioModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxGraphModule,
    ToastrModule.forRoot(),
    MaterialExampleModule,
    AgGridModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalAppIntercepter, multi: true },
    { provide: FormioAppConfig, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
