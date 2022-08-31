import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Match} from "../../../../model/Match";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Set} from "../../../../model/Set";
import {throws} from "assert";
import {UserPerformerService} from "../userPerformer/user-performer.service";
import {User} from "../../../../model/User";
import {Comment} from "../../../../model/Comment";

@Injectable({
  providedIn: 'root'
})
export class MatchPerformerService {

  constructor(private persistent:AngularFirestore , private userPerformer: UserPerformerService ) { }

  public JsonToClassObject(json: object): Match {
    let obj = <object>json;
    let match = new Match()
    // @ts-ignore
    match.id = obj.id
    // @ts-ignore
    match.type = obj.type
    // @ts-ignore
    match.date = new Date(<number>obj.date)
    match.sets = []
    // @ts-ignore
    for (const setItem of Object.assign([], obj.set)) {
      let set=new Set();
      set.gamesPlayer1=setItem.gamesPlayer1
      set.gamesPlayer2=setItem.gamesPlayer2
      match.sets.push(set)
    }
    match.player1 = []
    // @ts-ignore
    for (const playerId of Object.assign([], obj.player1)) {
      this.getPlayer(playerId).subscribe(
        (res) =>match.player1.push(<User>res[0]),
        (error) => {
          throw new Error('error Player1' + ": " + error)
        }
      )
    }
    match.player2 = []
    // @ts-ignore
    for (const playerId of Object.assign([], obj.player2)) {
      this.getPlayer(playerId).subscribe(
        (res) =>match.player2.push(<User>res[0]),
        (error) => {
          throw new Error('error Player2' + ": " + error)
        }
      )
    }
    return match
  }

  public ClassObjectToJson(match : Match):object{
    let idPlayer1 = [];
    for (const obj of match.player1) {
      if(this.userPerformer.existOne(obj.id)) idPlayer1.push(obj.id)
      else throw new Error("player don't exist")
    }
    let idPlayer2 = [];
    for (const obj of match.player2) {
      if(this.userPerformer.existOne(obj.id))idPlayer2.push(obj.id)
      else throw new Error("player don't exist")
    }
    let sets=[]
    for(const obj of match.sets){
      sets.push({
        gamesPlayer1: obj.gamesPlayer1,
        gamesPlayer2: obj.gamesPlayer2
      })
    }

    return {
      id: match.id,
      type: match.type,
      date: match.date.getTime(),
      player1: Object.assign({},idPlayer1),
      player2: Object.assign({},match.player2),
      sets: Object.assign({},sets),
    }
  }

  async store(toBeStored : Match,id=null){
    if(id!=null){
      await this.persistent.collection(toBeStored.constructor.name).doc(id).set(this.ClassObjectToJson(toBeStored)).then(
        ()=> toBeStored.id=id,
        (e)=>{throw new Error(e)}
      )
    }
    else await this.persistent.collection(toBeStored.constructor.name).add(this.ClassObjectToJson(toBeStored));
  }

  public loadOne(id: string){
    return this.persistent.collection(Match.name,ref => ref.where('id','==',id)).valueChanges()
  }

  public loadAll(){
    return this.persistent.collection(Match.name).valueChanges()
  }

  public load(whereField: string,whereOp: WhereFilterOp,whereValue: string){
    return this.persistent.collection(Match.name,ref => ref.where(whereField,whereOp,whereValue)).valueChanges()
  }

  public update(toBeStored : Match) {
    this.persistent.doc(Match.name + "/" + toBeStored.id).update(this.ClassObjectToJson(toBeStored)).catch(
      (error) => console.log('update ' + Match.name + ' error : ' + error))
  }

  public async existOne(id:string){
    let result=false
    await this.persistent.collection(Match.name,ref => ref.where('id','==',id)).valueChanges().subscribe(
      res=>{
        if(res.length>0) result=true
      }
    )
    return result
  }

  public async exist(whereField: string,whereOp: WhereFilterOp,whereValue: string){
    let result=false
    await this.persistent.collection(Match.name,ref => ref.where(whereField,whereOp,whereValue)).valueChanges().subscribe(
      res=>{
        if(res.length>0) result=true
      }
    )
    return result
  }

  public deleteOne(id:string) {
    this.persistent.doc(Match.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  private getPlayer(idPlayer: string){
    return this.userPerformer.loadOne(idPlayer)
  }

}
