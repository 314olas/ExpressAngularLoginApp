import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResponseObject} from '../interfaces/responseObject';
import {requestURL, ApiName} from '../constants';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient,
               private authService: AuthService) { }

  postRequest(url: string, obj) {
    return this.http.post<ResponseObject>(url, obj);
  }

  updateUserReq(url: string, obj?) {
    return this.http.put<ResponseObject>(url, obj);
  }

  getUserProfile() {
    if (localStorage.getItem(ApiName + 'profile')) {
      return JSON.parse(localStorage.getItem(ApiName + 'profile'));
    } else {
      return this.postRequest(requestURL + '/getUserProfile', this.authService.getUserInfo()).pipe(map(data => {
        if (data.options) {
          localStorage.setItem( ApiName + 'profile', JSON.stringify(data.options[0]));
          return data.options[0];
        } else {
          return {};
        }
      }));
    }
  }

  deleteUserProfile() {
    localStorage.removeItem(ApiName + 'profile');
  }

}
