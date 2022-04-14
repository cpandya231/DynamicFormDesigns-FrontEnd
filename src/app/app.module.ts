import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormioModule } from '@formio/angular';
import { CreateFormTemplateComponent } from './create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms-dashboard/forms-dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormTemplateComponent,
    FormsDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
