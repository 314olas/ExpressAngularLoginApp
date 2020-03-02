import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {requestURL} from '../constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formFields = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required]
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
      this.postReq.postRequest( requestURL + '/registration', this.formFields.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe(
          (data)  => {
          console.log(data);
          this.router.navigate(['registration/success']);
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
