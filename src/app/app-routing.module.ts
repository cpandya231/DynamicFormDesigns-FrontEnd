import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PocComponent } from './departments/poc/poc.component';
import { CreateFormTemplateComponent } from './forms/create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms/forms-dashboard/forms-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
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
    path: 'createForm/:name',
    component: CreateFormTemplateComponent
  },
  {
    path: 'createForm',
    component: CreateFormTemplateComponent
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
    component: PocComponent,
    children: [
      {
        path: 'create',
        component: CreateDepartmentComponent
      },


    ]
  },





  { path: '', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
