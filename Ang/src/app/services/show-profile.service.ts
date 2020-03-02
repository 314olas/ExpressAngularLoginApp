import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowProfileService {
  private  showProfile: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showProfile$: Observable<boolean>;

  constructor() {
    this.showProfile$ = this.showProfile.asObservable();
  }

  changeIsShow(value: boolean) {
    this.showProfile.next(value);
  }
}
