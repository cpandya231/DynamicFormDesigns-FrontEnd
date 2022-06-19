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

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatDialogModule } from '@angular/material/dialog';
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
import { OrgChartComponent } from './common/components/org-chart/org-chart.component';
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
    OrgChartComponent,
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
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NgxPaginationModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalAppIntercepter, multi: true },
    { provide: FormioAppConfig, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
