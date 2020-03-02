import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {requestURL} from '../../constants';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-reset-password-step1',
  templateUrl: './reset-password-step1.component.html',
  styleUrls: ['./reset-password-step1.component.scss']
})
export class ResetPasswordStep1Component implements OnInit, OnDestroy {
  formFields = this.formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required]
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
      this.postReq.postRequest(requestURL + '/resetPassword/step1', this.formFields.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe(
          (data)  => {
            this.router.navigate(['/resetpassword/step2', data.options[0].id]);
          },
          error => {
            console.log(error);
          });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
