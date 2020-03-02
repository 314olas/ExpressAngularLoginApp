import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {PrivateComponent} from './private/private.component';
import {LoginGuard} from './guards/login.guard';
import {AuthGuard} from './guards/auth.guard';
import {RegistrationComponent} from './registration/registration.component';
import {RegistrationSuccessComponent} from './registration-success/registration-success.component';
import {ResetPasswordStep1Component} from './reset-password/reset-password-step1/reset-password-step1.component';
import {ResetPasswordStep2Component} from './reset-password/reset-password-step2/reset-password-step2.component';
import {ResetPasswordSuccessComponent} from './reset-password/reset-password-success/reset-password-success.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileResolver} from './resolvers/profile.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'registration/success',
    component: RegistrationSuccessComponent
  },
  {
    path: 'resetpassword/step1',
    component: ResetPasswordStep1Component
  },
  {
    path: 'resetpassword/step2/:id',
    component: ResetPasswordStep2Component
  },
  {
    path: 'resetpassword/success',
    component: ResetPasswordSuccessComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard],
    resolve: {
      profile: ProfileResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
