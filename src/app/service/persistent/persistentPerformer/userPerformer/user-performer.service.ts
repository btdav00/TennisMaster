import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../../../../model/User";
import {collection} from "firebase/firestore";
import {Observable} from "rxjs";
import {map, refCount} from "rxjs/operators";
import {exists} from "fs";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Notification} from "../../../../model/Notification";
import {Club} from "../../../../model/Club";
import {Match} from "../../../../model/Match";
import {Comment} from "../../../../model/Comment";
import {setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserPerformerService {

  private defaultImgUrl="assets/defaultImg/profile.jpeg"

  constructor(private persistent:AngularFirestore) { }


  public eval(className:string,json){
    switch (className) {
      case User.name :
        return this.JsonToClassObject(<object>json)
      case Notification.name:
        return this.JsonToNotification(<object>json)
    }
  }

  public JsonToClassObject(json: object):User{
    let obj=<object>json;
    // @ts-ignore
    let ImgUrl=json.imgUrl
    if(ImgUrl=='')ImgUrl=this.defaultImgUrl
    let user= new User()
    // @ts-ignore
    user.id=obj.id
    // @ts-ignore
    user.name=obj.name
    // @ts-ignore
    user.surname=obj.surname
    // @ts-ignore
    user.birthdate=new Date(<number>obj.birthdate)
    // @ts-ignore
    user.imgUrl=ImgUrl
    return user
  }

  public ClassObjectToJson(user : User):object{
    let Id=''
    if(user.id)Id=user.id
    let ImgUrl=''
    if(user.imgUrl)ImgUrl=user.imgUrl
    return {
      id: Id,
      name: user.name,
      surname: user.surname,
      birthdate: user.birthdate.getTime(),
      imgUrl: ImgUrl,
      IDC:'',
    }
  }

  async store(toBeStored : User,id: string){
    let result:string
    if(id!=null){
      result=id
      await this.persistent.collection(toBeStored.constructor.name).doc(id).set(this.ClassObjectToJson(toBeStored)).then(
        ()=>toBeStored.id=id,
        (e)=>{throw new Error(e)}
      )
    }
    else{
      console.log(this.ClassObjectToJson(toBeStored))
      await this.persistent.collection(toBeStored.constructor.name).add(this.ClassObjectToJson(toBeStored)).then(
        (doc)=>{
          this.persistent.doc(toBeStored.constructor.name + "/" + doc.id).update({id:doc.id})
          result=doc.id}
      );
    }
    return result
  }

  public loadOne(id: string){
    console.log('questo è : '+id)
    return this.persistent.collection(User.name,ref => ref.where('id','==',id)).valueChanges()
  }

  public loadAll(){
    return this.persistent.collection(User.name).valueChanges()
  }

  public load(whereField: string,whereOp: WhereFilterOp,whereValue: string){
    return this.persistent.collection(User.name,ref => ref.where(whereField,whereOp,whereValue)).valueChanges()
  }

  public update(toBeStored : User) {
    this.persistent.doc(User.name + "/" + toBeStored.id).update(this.ClassObjectToJson(toBeStored)).catch(
      (error) => console.log('update ' + User.name + ' error : ' + error))
  }

  public async existOne(id:string){
    let result=false
    await this.persistent.collection(User.name,ref => ref.where('id','==',id)).valueChanges().subscribe(
      res=>{
        if(res.length>0) result=true
      }
    )
    return result
  }

  public async exist(whereField: string,whereOp: WhereFilterOp,whereValue: string){
    let result=false
    await this.persistent.collection(User.name,ref => ref.where(whereField,whereOp,whereValue)).valueChanges().subscribe(
      res=>{
        if(res.length>0) result=true
      }
    )
    return result
  }

  public deleteOne(id:string) {
    this.persistent.doc(User.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public async addImg(id:string,url:string){
    await this.persistent.collection(User.name).doc(id).update({imgUrl: url})
  }

  public getImg(id:string){
    this.persistent.collection(User.name,ref => ref.where('id','==',id)).valueChanges().pipe(
      map(
        (obj)=>{
          const object=<object>obj[0]
          // @ts-ignore
          return object.imgUrl
        }
      )
    )
  }

  addUserToClub(id:string , idClub:string){
    let doc=this.persistent.collection(User.name).doc(id).update({IDC: idClub})
  }

  getUserClubId(id:string){
    let idClub=''
    this.loadOne(id).subscribe(
      // @ts-ignore
      (objs)=>idClub=objs[0].IDC
    )
    return idClub
  }

  async addFollower(idFollowed:string,idFollower:string){
    await this.persistent.collection('Follower').doc(idFollower).set({idFollower:idFollower,idFollowed:idFollowed})
  }

  getFolloweds(idFollower:string){
    return this.persistent.collection('Follower',ref=>ref.where('idFollower','==',idFollower)).valueChanges()
  }

  getFollowers(idFollowed:string){
    return this.persistent.collection('Follower',ref=>ref.where('idFollowed','==',idFollowed)).valueChanges()
  }

  deleteFollowed(idFollower:string){
    this.persistent.doc('Follower' + "/" + idFollower).delete().catch(
      (error) => console.log(error)
    )
  }

  existFollower(idFollowed:string,idFollower:string){
    let result=false
    this.persistent.collection('Follower',ref=>ref.where('idFollowed','==',idFollowed)).valueChanges().subscribe(
      (resultQ)=>{if(resultQ.length>0)result=true}
    )
    return result
  }

  public NotificationToJson(notification: Notification , user: User){
    let id=''
    if(notification.id)id=notification.id
    return{
      UID : id,
      id : notification.id,
      text :notification.text,
      reference : notification.reference.id,
    }
  }

  public JsonToNotification(json:object){
    let notification = new Notification()
    // @ts-ignore
    notification.id=json.id
    // @ts-ignore
    notification.text=json.text
    // @ts-ignore
    this.userPerformer.loadOne(json.reference).subscribe(
      (result)=>notification.reference=this.JsonToClassObject(<object>result[0])
    )

    return notification
  }

  public async addNotification( notification:Notification ,user: User ){
    await this.persistent.collection(notification.constructor.name).add(this.NotificationToJson(notification,user)).then(
      (doc)=>this.persistent.doc(notification.constructor.name + "/" + doc.id).update({id:doc.id})
    );
  }

  public async deleteNotification(id: string){
    this.persistent.doc(Notification.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchNotification(id:string=null,idUser:string=null,referenceId:string=null) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idUser)whereClauses.push({field: 'UID', op:<WhereFilterOp>'==', value: idUser})
    if(referenceId)whereClauses.push({field: 'reference', op:<WhereFilterOp>'==', value: referenceId})

    let q: AngularFirestoreCollection<object>
    if(whereClauses.length>0){
      q=this.persistent.collection(Notification.name, ref =>{
        let where=ref.where(whereClauses[0].field,whereClauses[0].op,whereClauses[0].value)
        for (let i = 1; i < whereClauses.length; i++) {
          where=where.where(whereClauses[i].field,whereClauses[i].op,whereClauses[i].value)
        }
        return where
      })
    }
    else{
      q=this.persistent.collection(Notification.name)
    }
    return q.valueChanges()
  }

  public existNotification(id:string=null,idUser:string=null,referenceId:string=null) {
    let exist=false;
    this.searchNotification(id, idUser, referenceId).subscribe((result) => {
      if(result.length>0)exist=true;
    })
    return exist
  }
}
