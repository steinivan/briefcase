import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataConditionService {
  saveOrNot:boolean;
  saveOrNotChange : Subject<boolean> = new Subject<boolean>();
  constructor() { }

  saveStatus(value:boolean){
    this.saveOrNotChange.next(value)
  }
}
