import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateFormTemplateComponent } from './create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms-dashboard/forms-dashboard.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
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
  { path: '', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
