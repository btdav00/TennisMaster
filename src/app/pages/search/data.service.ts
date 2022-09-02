import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private fromTabs = new BehaviorSubject<boolean>(true)
  currentFrom = this.fromTabs.asObservable()

  constructor() { }

  changeFromTabs(bool: boolean){
    this.fromTabs.next(bool)
  }
}
