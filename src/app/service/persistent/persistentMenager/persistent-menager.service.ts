import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../../../model/User";
import {Booking} from "../../../model/Booking";
import {Club} from "../../../model/Club";
import {Comment} from "../../../model/Comment";
import {Court} from "../../../model/Court";
import {Dare} from "../../../model/Dare";
import {Match} from "../../../model/Match";
import {Notification} from "../../../model/Notification";
import {Place} from "../../../model/Place";
import {Review} from "../../../model/Review";
import {Schedule} from "../../../model/Schedule";
import {Set} from "../../../model/Set";
import {UserPerformerService} from "../persistentPerformer/userPerformer/user-performer.service";

@Injectable({
  providedIn: 'root'
})
export class PersistentMenagerService {

  constructor(private userPerformer : UserPerformerService) { }

  getPersistentPerformer(modelClass : string){
    let result=null;
    switch (modelClass) {
      case User.name :
        result=this.userPerformer
        break;
      case Booking.name:
        break;
      case Club.name:
        break;
      case Comment.name:
        break;
      case Court.name:
        break;
      case Dare.name:
        break;
      case Match.name:
        break;
      case Notification.name:
        break;
      case Place.name:
        break;
      case Review.name:
        break;
      case Schedule.name:
        break;
      case Set.name:
        break;
    }
    return result
  }

  async store(toBeStored : User,id: string) {
    await this.getPersistentPerformer(toBeStored.constructor.name).store(toBeStored,id)
  }


  public async load(className : string , id: string){
    return this.getPersistentPerformer(className).load(id)
  }


}
