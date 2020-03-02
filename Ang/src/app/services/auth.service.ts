import { Injectable } from '@angular/core';

interface UserInfoField {
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserInfo(): UserInfoField {
    return JSON.parse(localStorage.getItem('NJ_App_UserInfo'));
  }

  isLogged() {
    return !!this.getUserInfo();
  }

  logOut() {
    localStorage.removeItem('NJ_App_UserInfo');
  }

}
