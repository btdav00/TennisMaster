import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../../../../model/User";
import {collection} from "firebase/firestore";
import {Observable} from "rxjs";
import {refCount} from "rxjs/operators";
import {exists} from "fs";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

@Injectable({
  providedIn: 'root'
})
export class UserPerformerService {

  constructor(private persistent:AngularFirestore ) { }

  public JsonToClassObject(json: object):User{
    let obj=<object>json;
    let user= new User()
    // @ts-ignore
    user.id=obj.id
    // @ts-ignore
    user.name=obj.name
    // @ts-ignore
    user.surname=obj.surname
    // @ts-ignore
    user.birthdate=new Date(<number>obj.birthdate)
    return user
  }

  public ClassObjectToJson(user : User):object{
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      birthdate: user.birthdate.getTime()
    }
  }

  async store(toBeStored : User,id: string){
    if(id!=null){
      await this.persistent.collection(toBeStored.constructor.name).doc(id).set(this.ClassObjectToJson(toBeStored)).then(
        ()=> toBeStored.id=id,
        (e)=>{throw new Error(e)}
      )
    }
    else await this.persistent.collection(toBeStored.constructor.name).add(this.ClassObjectToJson(toBeStored));
  }

  public loadOne(id: string){
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
}
