import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ShowProfileService} from '../services/show-profile.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private showProfile: ShowProfileService) {}

  canActivate(): boolean {
   if ( this.auth.isLogged() ) {
      this.showProfile.changeIsShow(true);
      return true;
   } else {
     this.router.navigate(['login']);
     return false;
   }
  }
}
