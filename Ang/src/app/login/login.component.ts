import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators, ValidatorFn} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {requestURL} from '../constants';
import {NavShowService} from '../services/nav-show.service';

function isIncludeDomain(control: AbstractControl): { [key: string]: any} | null {
  if ( control.value && (control.value.indexOf('@') >= 0) ) {
    return  null;
  } else {
    return  {'domain': true};
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formFields = this.formBuilder.group({
    email: ['', [Validators.required, isIncludeDomain]],
    password: ['', Validators.required]
  });
  alive = true;
  isShow: boolean;

  constructor( private formBuilder: FormBuilder,
               private loginReq: ApiService,
               private router: Router,
               private navIsShow: NavShowService
  ) { }

  ngOnInit() {
    this.navIsShow.isShow$.subscribe(value => this.isShow = value);
    this.formFields.reset();
  }

  private onSubmit() {
    this.loginReq.postRequest(requestURL + '/login', this.formFields.value )
      .pipe(takeWhile(() => this.alive))
      .subscribe( (data)  => {
        localStorage.setItem('NJ_App_UserInfo', JSON.stringify({name: data.name, token: data.token}));
        this.router.navigate(['home']);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
