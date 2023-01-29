import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReportDashboardComponent } from './create-report/report-dashboard.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { DepartmentDashboardComponent } from './departments/department-dashboard/department-dashboard.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';

import { CreateFormTemplateComponent } from './forms/create-form-template/create-form-template.component';
import { EntryAuditDataComponent } from './forms/entry-audit-data/entry-audit-data.component';
import { FillFormComponent } from './forms/fill-form/fill-form.component';
import { FormManagementComponent } from './forms/form-management/form-management.component';
import { FormWorkflowComponent } from './forms/form-workflow/form-workflow-dashboard.component';
import { FormsDashboardComponent } from './forms/forms-dashboard/forms-dashboard.component';
import { MasterFormsComponent } from './forms/master-forms/master-forms.component';
import { UserFormsDashboardComponent } from './forms/user-forms-dashboard/user-forms-dashboard.component';
import { UserFormsInProgressDataComponent } from './forms/user-forms-in-progress/user-forms-in-progress-data/user-forms-in-progress-data.component';
import { UserFormsInProgressComponent } from './forms/user-forms-in-progress/user-forms-in-progress.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { AuditTrailComponent } from './settings/audit-trail/audit-trail.component';
import { SystemConfigComponent } from './settings/system-config/system-config.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersInfoComponent } from './users/users-info/users-info.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { WatchTowerComponent } from './watch-tower/watch-tower.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'formsDashboard',
    component: FormsDashboardComponent,

  },
  {
    path: 'watchTower',
    component: WatchTowerComponent
  },
  {
    path: 'formManagement/:formName/:formId/:workflowId',
    component: FormManagementComponent,
    children: [{
      path: '',
      component: CreateFormTemplateComponent
    }, {
      path: 'formWorkflow',
      component: FormWorkflowComponent,
    }]
  },
  {
    path: 'formManagement',
    component: FormManagementComponent,
    children: [{
      path: '',
      component: CreateFormTemplateComponent
    }]
  },
  {
    path: 'userFormsDashboard',

    children: [

      {
        path: 'userForms',
        children: [
          {
            path: 'formsInProgressData/:formId/:formName/:workflowId',
            component: UserFormsInProgressDataComponent,

          },
          {
            path: 'updateLogEntry/:formName/:entryId',
            component: FillFormComponent
          },
          {
            path: 'auditLogEntry/:formName/:formId/:entryId',
            component: EntryAuditDataComponent
          },


          {
            path: 'createLogEntry/:formName',
            component: FillFormComponent
          },
          {
            path: '',
            component: UserFormsInProgressComponent,
          },

        ]
      },

      {
        path: 'masterForms',

        children: [
          {
            path: 'formsInProgressData/:formId/:formName/:workflowId',
            component: UserFormsInProgressDataComponent,

          },
          {
            path: 'updateLogEntry/:formName/:entryId',
            component: FillFormComponent
          },

          {
            path: 'auditLogEntry/:formName/:formId/:entryId',
            component: EntryAuditDataComponent
          },
          {
            path: 'createLogEntry/:formName',
            component: FillFormComponent
          },
          {
            path: '',
            component: MasterFormsComponent
          },

        ]

      },

      {
        path: '',
        component: UserFormsDashboardComponent,
      }
    ]
  },


  {
    path: 'usersParent', children: [
      {
        path: 'users',
        children: [
          {
            path: 'update/:username', component: CreateUserComponent,
          },
          {
            path: 'create', component: CreateUserComponent,
          },
          {
            path: '', component: UsersInfoComponent,
          },

        ]
      },

      { path: 'roles', component: RolesComponent },

    ],
  },

  {
    path: 'departments',

    children: [
      {
        path: 'create/:departmentId',
        component: CreateDepartmentComponent
      },
      {
        path: 'edit/:departmentId',
        component: EditDepartmentComponent
      },
      {
        path: '', component: DepartmentDashboardComponent,
      },

    ]
  },

  {
    path: 'settingsParent', children: [
      {
        path: 'audit-trail',
        component: AuditTrailComponent,
        children: []
      },
      {
        path: 'system-config',
        component: SystemConfigComponent,
        children: []
      },
    ],
  },
  {
    path: 'reports',
    component: ReportDashboardComponent
  },
  {
    path: 'viewReports',
    component: ViewReportsComponent
  },
  { path: '', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
