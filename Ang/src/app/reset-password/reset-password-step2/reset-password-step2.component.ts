import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, ParamMap} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {requestURL} from '../../constants';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-reset-password-step2',
  templateUrl: './reset-password-step2.component.html',
  styleUrls: ['./reset-password-step2.component.scss']
})
export class ResetPasswordStep2Component implements OnInit, OnDestroy {
  formFields = this.formBuilder.group({
    firstPassword: ['', Validators.required],
    secondPassword: ['', Validators.required]
  });
  alive = true;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private postReq: ApiService) { }

  ngOnInit() {
  }

  private onSubmit() {
    if (this.formFields.status === 'INVALID') {
      console.log(this.formFields, 'INVALID');
    } else  {
      const firstPassword = this.formFields.value.firstPassword;
      const secondPassword = this.formFields.value.secondPassword;
      console.log(requestURL + '/resetPassword/step2/' + location.pathname.split('/')[location.pathname.split('/').length - 1]);
      if (firstPassword === secondPassword) {
        this.postReq.updateUserReq(
          requestURL + '/resetPassword/step2/' + location.pathname.split('/')[location.pathname.split('/').length - 1],
          {password: firstPassword})
          .pipe(takeWhile(() => this.alive))
          .subscribe(
            (data)  => {
              (data.text === 'updated') ?
                this.router.navigate(['/resetpassword/success']) :
                console.log(data.text);
            },
            error => {
              console.log(error);
            });
      } else  {
        console.log(firstPassword, secondPassword);
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
