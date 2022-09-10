import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Match} from "../../../../model/Match";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Set} from "../../../../model/Set";
import {throws} from "assert";
import {UserPerformerService} from "../userPerformer/user-performer.service";
import {User} from "../../../../model/User";
import {Comment} from "../../../../model/Comment";
import {Notification} from "../../../../model/Notification";
import {map, switchMap} from "rxjs/operators";
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class MatchPerformerService {

  constructor(private persistent:AngularFirestore , private userPerformer: UserPerformerService ) { }

  public eval(className:string,json){
    switch (className) {
      case Match.name :
        return this.JsonToClassObject(<object>json)
      case Comment.name:
        return this.JsonToComment(<object>json)
    }
  }

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
    for (const setItem of Object.assign([], obj.sets)) {
      let set=new Set();
      set.gamesPlayer1=setItem.gamesPlayer1
      set.gamesPlayer2=setItem.gamesPlayer2
      match.sets.push(set)
    }
    match.player1 = []
    // @ts-ignore
    for (const playerId of Object.assign([], obj.player1)) {
      this.userPerformer.loadOne(playerId).subscribe(
        (res) =>match.player1.push(this.userPerformer.JsonToClassObject(<object>res[0])),
        (error) => {
          throw new Error('error Player1' + ": " + error)
        }
      )
    }
    match.player2 = []
    // @ts-ignore
    for (const playerId of Object.assign([], obj.player2)) {
      this.userPerformer.loadOne(playerId).subscribe(
        (res) =>match.player2.push(this.userPerformer.JsonToClassObject(<object>res[0])),
        (error) => {
          throw new Error('error Player2' + ": " + error)
        }
      )
    }
    // @ts-ignore
    this.userPerformer.loadOne(obj.publisher).subscribe(
      (res)=>match.publisher=this.userPerformer.JsonToClassObject(res)
    )
    return match
  }



  public ClassObjectToJson(match : Match):object{
    let idPlayer1 = [];
    for (const obj of match.player1) {
     idPlayer1.push(obj.id)
    }
    let idPlayer2 = [];
    for (const obj of match.player2) {
      idPlayer2.push(obj.id)
    }
    let sets=[]
    for(const obj of match.sets){
      sets.push({
        gamesPlayer1: obj.gamesPlayer1,
        gamesPlayer2: obj.gamesPlayer2
      })
    }

    let id=''
    if(match.id)id=match.id
    return {
      id: id,
      type: match.type,
      date: match.date.getTime(),
      player1: Object.assign({},idPlayer1),
      player2: Object.assign({},idPlayer2),
      sets: Object.assign({},sets),
      publisher:match.publisher.id,
      CID: '',
    }
  }

  async store(toBeStored : Match,id=null) {
    let result: string
    if (id != null) {
      result = id
      console.log(this.ClassObjectToJson(toBeStored))
      await this.persistent.collection(toBeStored.constructor.name).doc(id).set(this.ClassObjectToJson(toBeStored)).then(
        () => toBeStored.id = id,
        (e) => {
          throw new Error(e)
        }
      )
    } else {
      console.log(this.ClassObjectToJson(toBeStored))
      await this.persistent.collection(toBeStored.constructor.name).add(this.ClassObjectToJson(toBeStored)).then(
        (doc) => {
          this.persistent.doc(toBeStored.constructor.name + "/" + doc.id).update({id: doc.id})
          result = doc.id
        }
      );
    }
    return result
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

  public getMatchOfFollowee(idUser){
    this.userPerformer.getFolloweds(idUser).pipe(switchMap(
      (obj)=>{
        let followee=[]
        for (const item of <object[]>obj) {
          // @ts-ignore
          followee.push(obj.followed)
        }
        return this.persistent.collection(Match.name,ref => ref.where('publisher','array-contains-any',followee).orderBy('date','desc')).valueChanges()
      }
    ))
  }

  public async setClubMatch(idMatch:string,idClub:string){
    await this.persistent.collection(Match.name).doc(idMatch).update({CID: idClub})
  }

  public getClubMatchId(idMatch:string){
    return this.loadOne(idMatch).pipe(map(
      data=>{
        // @ts-ignore
        if(data.length>0)return data[0].CID
        else throw new Error('match do not have club')
      }
    ))
  }

  public CommentToJson(comment: Comment , match: Match,idUser: string=null){
    let writerId=comment.id
    let id=''
    if(comment.id)id=comment.id
    if(idUser && !comment.writer)writerId=idUser
    else if((comment.writer && comment.writer.id!=idUser)||(!comment.writer && !idUser)) throw new Error('invalid id')
    return{
      MID : match.id,
      id : id,
      text : comment.text,
      time : comment.time.getTime(),
      writer : writerId
    }
  }

  public JsonToComment(json:object){
    let comment = new Comment()
    // @ts-ignore
    comment.id=json.id
    // @ts-ignore
    comment.text=json.text
    // @ts-ignore
    comment.time=new Date(json.time)
    // @ts-ignore
    this.userPerformer.loadOne(json.writer).subscribe(
      (result)=>comment.writer=this.userPerformer.JsonToClassObject(<object>result[0])
    )

    return comment
  }

  public async addComment( comment:Comment ,match: Match,idUser: string=null ){
    await this.persistent.collection(comment.constructor.name).add(this.CommentToJson(comment,match,idUser)).then(
      (doc)=> this.persistent.doc(Comment.name + "/" + doc.id).update({id:doc.id})
    );
  }

  public async deleteComment(id: string){
    this.persistent.doc(Comment.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchComment(id:string=null,idMatch:string=null,writerId:string=null,orderByField:string[]=null,orderByAscending:boolean[]=null) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idMatch)whereClauses.push({field: 'MID', op:<WhereFilterOp>'==', value: idMatch})
    if(writerId)whereClauses.push({field: 'writer', op:<WhereFilterOp>'==', value: writerId})

    let q: AngularFirestoreCollection<object>
    if(whereClauses.length>0){
      q=this.persistent.collection(Comment.name, ref =>{
        let where=ref.where(whereClauses[0].field,whereClauses[0].op,whereClauses[0].value)
        for (let i = 1; i < whereClauses.length; i++) {
          where=where.where(whereClauses[i].field,whereClauses[i].op,whereClauses[i].value)
        }
        for (let i=0;i<orderByField.length;i++){
          let order='desc'
          if(orderByAscending[i]) order='asc'
          where=where.orderBy(orderByField[i],<OrderByDirection>order)
        }
        return where
      })
    }
    else{
      q=this.persistent.collection(Comment.name)
    }
    return q.valueChanges()
  }

  public existComment(id:string=null,idMatch:string=null,writerId:string=null) {
    let exist=false;
    this.searchComment(id, idMatch, writerId).subscribe((result) => {
      if(result.length>0)exist=true;
    })
    return exist
  }



}
