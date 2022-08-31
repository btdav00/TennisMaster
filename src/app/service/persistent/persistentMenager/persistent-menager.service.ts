import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../../../model/User";
import {Booking} from "../../../model/Booking";
import {Club} from "../../../model/Club";
import {Comment} from "../../../model/Comment";
import {Court} from "../../../model/Court";
import {Match} from "../../../model/Match";
import {Notification} from "../../../model/Notification";
import {Place} from "../../../model/Place";
import {Review} from "../../../model/Review";
import {Schedule} from "../../../model/Schedule";
import {UserPerformerService} from "../persistentPerformer/userPerformer/user-performer.service";
import {Observable} from "rxjs";
import {MatchPerformerService} from "../persistentPerformer/matchPerformer/match-performer.service";

@Injectable({
  providedIn: 'root'
})
export class PersistentMenagerService {

  constructor(private userPerformer : UserPerformerService, private matchPerformer : MatchPerformerService) { }

  getPersistentPerformer(modelClass : string){
    let result=null;
    switch (modelClass) {
      case User.name :
        result=this.userPerformer
        break;
      case Club.name:
        break;
      case Match.name:
        result= this.matchPerformer
        break;
    }
    return result
  }

  public eval(modelClass: string , objs : object[]){
    let result=[]
    for (const obj of objs) {
      result.push(this.getPersistentPerformer(modelClass).JsonToClassObject(obj))
    }
    return result
  }

  async store(toBeStored : User,id: string) {
    await this.getPersistentPerformer(toBeStored.constructor.name).store(toBeStored,id)
  }


  public loadOne(className : string , id: string): Observable<any>{
    return this.getPersistentPerformer(className).load(id)
  }

  public loadAll(className : string): Observable<any>{
    return this.getPersistentPerformer(className).loadAll()
  }


}
