import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {requestURL} from '../constants';
// @ts-ignore
import {UserProfile} from '../interfaces/userProfile';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile;
  userProfileKeys = [];

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userProfile = this.route.snapshot.data.profile;
    this.userProfileKeys = Object.keys(this.route.snapshot.data.profile);
  }
}
