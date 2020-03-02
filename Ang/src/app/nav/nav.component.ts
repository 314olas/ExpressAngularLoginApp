import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavShowService} from '../services/nav-show.service';
import {AuthService} from '../services/auth.service';
import {ShowProfileService} from '../services/show-profile.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ApiService} from '../services/api.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription  = new Subscription();
  collapse: boolean;
  isLogIn: boolean;

  constructor(private navIsShow: NavShowService,
              private authService: AuthService,
              private showProfile: ShowProfileService,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.navIsShow.isShow$.subscribe(value => {
        this.collapse = value;
      })
    );
    this.subscriptions.add(
      this.showProfile.showProfile$.subscribe( value => this.isLogIn = value)
    );
  }

  ngOnDestroy(): void {
   this.subscriptions.unsubscribe();
  }

  showList() {
    this.collapse ? this.navIsShow.changeIsShow(false) : this.navIsShow.changeIsShow(true);
  }

  logOut() {
    this.authService.logOut();
    this.apiService.deleteUserProfile();
    this.showProfile.changeIsShow(false);
    this.router.navigateByUrl('login', {replaceUrl: true});
  }

}
