import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyinputService {

  public input: object

  constructor() { }

  public addInput(input: object){
    this.input=input
  }

  public getInput(){
    return this.input
  }

}
