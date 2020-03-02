import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NguCarouselModule} from '@ngu/carousel';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivateComponent } from './private/private.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import {ResetPasswordStep1Component} from './reset-password/reset-password-step1/reset-password-step1.component';
import { ResetPasswordStep2Component } from './reset-password/reset-password-step2/reset-password-step2.component';
import { ResetPasswordSuccessComponent } from './reset-password/reset-password-success/reset-password-success.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NguCarouselModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    PrivateComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    ResetPasswordStep1Component,
    ResetPasswordStep2Component,
    ResetPasswordSuccessComponent,
    ProfileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
