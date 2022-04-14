import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormTemplateComponent } from './create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms-dashboard/forms-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FormsDashboardComponent
  },
  {
    path: 'createForm',
    component: CreateFormTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
