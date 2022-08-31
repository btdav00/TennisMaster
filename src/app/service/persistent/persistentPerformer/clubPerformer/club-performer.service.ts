import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../../../model/User";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Club} from "../../../../model/Club";
import {Place} from "../../../../model/Place";
import {Court} from "../../../../model/Court";

@Injectable({
  providedIn: 'root'
})
export class ClubPerformerService {

  constructor(private persistent:AngularFirestore ) { }

  public JsonToClassObject(json: object):Club{
    let obj=<object>json;
    let club= new Club()
    // @ts-ignore
    club.id=obj.id
    // @ts-ignore
    club.name=obj.name
    // @ts-ignore
    club.place=this.JsonToPlace(obj.place)
    // @ts-ignore
    club.courts=this.JsonToCourts(obj.courts)
    return club
  }

  public ClassObjectToJson(club : Club):object{
    return {
      id: club.id,
      name: club.name,
      place: this.JsonToPlace(club.place),
      courts: this.JsonToCourts(club.courts)
    }
  }

  private JsonToPlace(json:object){
    let place=new Place()
    // @ts-ignore
    place.street=json.street
    // @ts-ignore
    place.cap=json.cap
    // @ts-ignore
    place.city=json.city
    // @ts-ignore
    place.houseNumber=json.houseNumber
    return place
  }

  private PlaceToJson(place: Place){
    return {
      cap: place.cap,
      city: place.city,
      houseNumber: place.houseNumber,
      street : place.street
    }
  }

  private JsonToCourts(json:object){
    let courtsObj=Object.assign([],json)
    let courts=[]
    for (const courtObj of courtsObj) {
      let court=new Court()
      court.number=<number>courtObj.number
      court.indoor=<boolean>courtObj.indoor
      court.surface=courtObj.surface
      courts.push(court)
    }
    return courts
  }

  private CourtsToJson(courts: Court[]){
    let courtsObj=[]
    for (const court of courts) {
      let courtObj={
        number: court.number,
        indoor: court.indoor,
        surface: court.surface
      }
      courtsObj.push(courtsObj)
    }
    return Object.assign({},courtsObj)
  }

  async store(toBeStored : Club,id=null){
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

  public update(toBeStored : Club) {
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
