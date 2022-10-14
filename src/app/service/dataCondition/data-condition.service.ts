import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataConditionService {
  saveOrNot:boolean;
  saveOrNotChange : Subject<boolean> = new Subject<boolean>();
  login:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly currentUser: Observable<boolean> = this.login.asObservable();
  // login:Subject<boolean> = new Subject<boolean>();
  constructor() { 
  }

  saveStatus(value:boolean){
    this.saveOrNotChange.next(value)
  }
  signIn(){
    this.login.next(true);
  }
  logOut(){
    this.login.next(false);
  }
}
