import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<UserProfile> {

  constructor(private apiService: ApiService) {
  }

  resolve() {
    return this.apiService.getUserProfile();
  }
}
