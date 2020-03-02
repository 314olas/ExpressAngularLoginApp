import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavShowService {
  private  isShow: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public isShow$: Observable<boolean>;

  constructor() {
    this.isShow$ = this.isShow.asObservable();
  }

  changeIsShow(value: boolean) {
    this.isShow.next(value);
  }
}
