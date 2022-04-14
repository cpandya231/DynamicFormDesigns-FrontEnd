import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormioModule } from '@formio/angular';
import { CreateFormTemplateComponent } from './create-form-template/create-form-template.component';
import { FormsDashboardComponent } from './forms-dashboard/forms-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormTemplateComponent,
    FormsDashboardComponent,
    LoginComponent,
    WelcomeComponent,
    PasswordPatternDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormioModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
