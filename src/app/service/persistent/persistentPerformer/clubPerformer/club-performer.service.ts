import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, associateQuery} from "@angular/fire/compat/firestore";
import {User} from "../../../../model/User";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Club} from "../../../../model/Club";
import {Place} from "../../../../model/Place";
import {Court} from "../../../../model/Court";
import {Booking} from "../../../../model/Booking";
import {collection, query, where} from "firebase/firestore";
import {push} from "@angular/fire/database";
import {Firestore, onSnapshot} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Review} from "../../../../model/Review";
import {UserPerformerService} from "../userPerformer/user-performer.service";

@Injectable({
  providedIn: 'root'
})
export class ClubPerformerService {

  constructor(private persistent:AngularFirestore , private userPerformer: UserPerformerService ) { }

  public eval(className:string,json){
    switch (className) {
      case Club.name :
        return this.JsonToClassObject(<object>json)
      case Review.name:
        return this.JsonToReview(<object>json)
      case Booking.name:
        return this.JsonToBooking(<object>json)
    }
  }

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
    club.times=<number[]>Object.assign([],obj.times)
    // @ts-ignore
    club.courts=this.JsonToCourts(obj.courts)
    return club
  }

  public ClassObjectToJson(club : Club):object{
    return {
      id: club.id,
      name: club.name,
      place: this.JsonToPlace(club.place),
      times: Object.assign({},club.times),
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


  public BookingToJson(user: User,booking: Booking , club: Club,court: Court){
    return{
      UID : user.id,
      CID : club.id,
      courtNumber: court.number,
      id : booking.id,
      date : booking.date.getTime(),
      numberHour : booking.numberHour,
      payment : booking.payment,
      startHour : booking.startHour
    }
  }

  public JsonToBooking(json:object){
    let booking = new Booking()
    // @ts-ignore
    booking.id=json.id
    // @ts-ignore
    booking.payment=<boolean>json.payment
    // @ts-ignore
    booking.date=new Date(<number>json.date)
    // @ts-ignore
    booking.startHour=<number>json.startHour
    // @ts-ignore
    booking.numberHour=<number>json.numberHour
    return booking
  }

  public async addBooking(user: User,booking: Booking , club: Club , court: Court){
    await this.persistent.collection(booking.constructor.name).add(this.BookingToJson(user,booking,club,court));
  }

  public async deleteBooking(id: string){
    this.persistent.doc(Booking.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchBooking(id:string=null,idUser:string=null,idClub:string=null,courtNumber:number=null,minDate:Date=null,maxDate:Date=null) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idUser)whereClauses.push({field: 'UID', op:<WhereFilterOp>'==', value: idUser})
    if(idClub)whereClauses.push({field: 'CID', op:<WhereFilterOp>'==', value: idClub})
    if(courtNumber)whereClauses.push({field: 'courtNumber', op:<WhereFilterOp>'==', value: courtNumber})
    if(minDate)whereClauses.push({field: 'date', op:<WhereFilterOp>'<=', value: minDate.getTime()})
    if(maxDate)whereClauses.push({field: 'date', op:<WhereFilterOp>'>=', value: maxDate.getTime()})

    let q: AngularFirestoreCollection<object>
    if(whereClauses.length>0){
      q=this.persistent.collection(Booking.name, ref =>{
        let where=ref.where(whereClauses[0].field,whereClauses[0].op,whereClauses[0].value)
        for (let i = 1; i < whereClauses.length; i++) {
          where=where.where(whereClauses[i].field,whereClauses[i].op,whereClauses[i].value)
        }
        return where
      })
    }
    else{
      q=this.persistent.collection(Booking.name)
    }
    return q.valueChanges()
  }

  public existBooking(id:string=null,idUser:string=null,idClub:string=null,courtNumber:number=null,minDate:Date=null,maxDate:Date=null) {
    let exist=false;
    this.searchBooking(id, idUser, idClub, courtNumber, minDate, maxDate).subscribe((result) => {
       if(result.length>0)exist=true;
    })
    return exist
  }


  public ReviewToJson(review : Review , club : Club){
    return{
      UID : review.user.id,
      CID : club.id,
      id : review.id,
      comment : review.comment,
      mark : review.mark,
    }
  }

  public JsonToReview(json:object){
    let review = new Review()
    // @ts-ignore
    review.id=json.id
    // @ts-ignore
    review.comment=json.comment
    // @ts-ignore
    review.mark=json.mark
    // @ts-ignore
    this.userPerformer.loadOne(json.UID).subscribe((obj)=>
      review.user=this.userPerformer.JsonToClassObject(obj)
    )
    return review
  }

  public async addReview(review: Review, club: Club){
    await this.persistent.collection(review.constructor.name).add(this.ReviewToJson(review,club));
  }

  public async deleteReview(id: string){
    this.persistent.doc(Review.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchReview(id:string=null,idUser:string=null,mark:number=null) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idUser)whereClauses.push({field: 'UID', op:<WhereFilterOp>'==', value: idUser})
    if(mark)whereClauses.push({field: 'mark', op:<WhereFilterOp>'==', value: mark})

    let q: AngularFirestoreCollection<object>
    if(whereClauses.length>0){
      q=this.persistent.collection(Review.name, ref =>{
        let where=ref.where(whereClauses[0].field,whereClauses[0].op,whereClauses[0].value)
        for (let i = 1; i < whereClauses.length; i++) {
          where=where.where(whereClauses[i].field,whereClauses[i].op,whereClauses[i].value)
        }
        return where
      })
    }
    else{
      q=this.persistent.collection(Review.name)
    }
    return q.valueChanges()
  }

  public existReview(id:string=null,idUser:string=null,mark:number=null) {
    let exist=false;
    this.searchReview(id, idUser, mark).subscribe((result) => {
      if(result.length>0)exist=true;
    })
    return exist
  }




}
