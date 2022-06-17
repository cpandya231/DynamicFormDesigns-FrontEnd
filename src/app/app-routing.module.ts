import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { DepartmentDashboardComponent } from './departments/department-dashboard/department-dashboard.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';

import { CreateFormTemplateComponent } from './forms/create-form-template/create-form-template.component';
import { FormManagementComponent } from './forms/form-management/form-management.component';
import { FormWorkflowComponent } from './forms/form-workflow/form-workflow-dashboard.component';
import { FormsDashboardComponent } from './forms/forms-dashboard/forms-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { AuditTrailComponent } from './settings/audit-trail/audit-trail.component';
import { SystemConfigComponent } from './settings/system-config/system-config.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersInfoComponent } from './users/users-info/users-info.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'formsDashboard',
    component: FormsDashboardComponent
  },
  {
    path: 'formManagement/:name/:workflowId',
    component: FormManagementComponent
  },
  {
    path: 'formManagement',
    component: FormManagementComponent
  },
  {
    path: 'formWorkflow',
    component: FormWorkflowComponent,
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

  { path: '', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
