import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateFormTemplateComponent } from './forms/create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms/forms-dashboard/forms-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
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
    path: 'createForm/:id',
    component: CreateFormTemplateComponent
  },
  {
    path: 'createForm',
    component: CreateFormTemplateComponent
  },
  { path: 'usersParent', component: UsersComponent },
  { path: 'usersParent/users', component: UsersComponent },
  { path: 'usersParent/roles', component: RolesComponent },
  {
    path: 'usersParent/createUser',
    component: CreateUserComponent
  },
  { path: '', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
