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
import { PasswordPatternDirective } from './directives/password-pattern.directive';
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
import { DeleteUserAlertComponent } from './users/users-info/delete-user-alert/delete-user-alert.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AppConfig } from './formio-app-config';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { PocComponent } from './departments/poc/poc.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormTemplateComponent,
    FormsDashboardComponent,
    LoginComponent,
    WelcomeComponent,
    PasswordPatternDirective,
    NavbarComponent,
    UsersComponent,
    RolesComponent,
    NgbdSortableHeader,
    PreviewFormComponent,
    CreateUserComponent,
    UsersInfoComponent,
    CreateRoleComponent,
    DeleteUserAlertComponent,
    DepartmentsComponent,
    CreateDepartmentComponent,
    PocComponent,

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
    NgxOrgChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalAppIntercepter, multi: true },
    { provide: FormioAppConfig, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
