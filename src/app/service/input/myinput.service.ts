import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyinputService {

  public input: object

  private fromTabs = new BehaviorSubject<boolean>(true)
  currentFrom = this.fromTabs.asObservable()

  private searched = new BehaviorSubject<string>("")
  currentSearched = this.searched.asObservable()

  constructor() { }

  public addInput(input: object){
    this.input=input
  }

  public getInput(){
    return this.input
  }

  changeFromTabs(bool: boolean){
    this.fromTabs.next(bool)
  }

  changeSearched(string: string){
    this.searched.next(string)
  }
}
