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
import {object, push} from "@angular/fire/database";
import {Firestore, onSnapshot} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Review} from "../../../../model/Review";
import {UserPerformerService} from "../userPerformer/user-performer.service";
import {map, switchMap} from "rxjs/operators";
import {Match} from "../../../../model/Match";
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class ClubPerformerService {

  private defaultImgUrl="assets/defaultImg/club.jpeg"

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
    // @ts-ignore
    let ImgUrl=json.imgUrl
    if(ImgUrl=='')ImgUrl=this.defaultImgUrl
    let obj=<object>json;
    let club= new Club()
    // @ts-ignore
    club.id=obj.id
    // @ts-ignore
    club.name=obj.name
    // @ts-ignore
    club.imgUrl=ImgUrl
    // @ts-ignore
    club.place=this.JsonToPlace(obj.place)
    // @ts-ignore
    club.times=<number[]>Object.assign([],obj.times)
    // @ts-ignore
    club.courts=this.JsonToCourts(obj.courts)
    return club
  }

  public ClassObjectToJson(club : Club):object{
    let id=''
    if(club.id)id=club.id
    let ImgUrl=''
    if(club.imgUrl)ImgUrl=club.imgUrl
    return {
      id: id,
      name: club.name,
      place: this.PlaceToJson(club.place),
      times: Object.assign({},club.times),
      courts: this.CourtsToJson(club.courts),
      imgUrl: ImgUrl
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
      court.price=courtObj.price
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
        surface: court.surface,
        price : court.price
      }
      courtsObj.push(courtObj)
    }
    return Object.assign({},courtsObj)
  }

  async store(toBeStored : Club,id=null){
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
    return this.persistent.collection(Club.name,ref => ref.where('id','==',id)).valueChanges()
  }

  public loadAll(){
    return this.persistent.collection(Club.name).valueChanges()
  }

  public load(whereField: string,whereOp: WhereFilterOp,whereValue: string){
    return this.persistent.collection(Club.name,ref => ref.where(whereField,whereOp,whereValue)).valueChanges()
  }

  public update(toBeStored : Club) {
    this.persistent.doc(Club.name + "/" + toBeStored.id).update(this.ClassObjectToJson(toBeStored)).catch(
      (error) => console.log('update ' + Club.name + ' error : ' + error))
  }

  public deleteOne(id:string) {
    this.persistent.doc(Club.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public getImg(id:string){
    this.persistent.collection(Club.name,ref => ref.where('id','==',id)).valueChanges().pipe(
      map(
        (obj)=>{
          const object=<object>obj[0]
          // @ts-ignore
          return object.imgUrl
        }
      )
    )
  }


  public BookingToJson(user: User,booking: Booking , club: Club,court: Court){
    let id=''
    if(booking.id)id=booking.id
    return{
      UID : user.id,
      CID : club.id,
      courtNumber: court.number,
      id : id,
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
    // @ts-ignore
    booking.courtNumber=<number>json.courtNumber
    return booking
  }

  public async addBooking(user: User,booking: Booking , club: Club , court: Court){
    await this.persistent.collection(booking.constructor.name).add(this.BookingToJson(user,booking,club,court)).then(
      (doc)=> this.persistent.doc(Booking.name + "/" + doc.id).update({id: doc.id})
    )
  }

  public async deleteBooking(id: string){
    this.persistent.doc(Booking.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchBooking(id:string=null,idUser:string=null,idClub:string=null,courtNumber:number=null,minDate:Date=null,maxDate:Date=null,orderByField:string[]=[],orderByAscending:boolean[]=[]) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idUser)whereClauses.push({field: 'UID', op:<WhereFilterOp>'==', value: idUser})
    if(idClub)whereClauses.push({field: 'CID', op:<WhereFilterOp>'==', value: idClub})
    if(courtNumber)whereClauses.push({field: 'courtNumber', op:<WhereFilterOp>'==', value: courtNumber})
    if(minDate)whereClauses.push({field: 'date', op:<WhereFilterOp>'>=', value: minDate.getTime()})
    if(maxDate)whereClauses.push({field: 'date', op:<WhereFilterOp>'<=', value: maxDate.getTime()})

    let q: AngularFirestoreCollection<object>
    if(whereClauses.length>0){
      q=this.persistent.collection(Booking.name, ref =>{
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
      q=this.persistent.collection(Booking.name)
    }
    return q.valueChanges()
  }

  public getClubBooking(idBooking:string){
    return this.searchBooking(idBooking).pipe(switchMap(
      data=>{
        // @ts-ignore
        if(data.length>0)return this.loadOne(data[0].CID)
        else throw new Error('booking do not have club')
      }
    ))
  }


  public ReviewToJson(review : Review , club : Club){
    let id=''
    if(review.id)id=review.id
    return{
      UID : review.user.id,
      CID : club.id,
      id : id,
      comment : review.comment,
      title: review.title
    }
  }

  public JsonToReview(json:object){
    let review = new Review()
    // @ts-ignore
    review.id=json.id
    // @ts-ignore
    review.comment=json.comment
    // @ts-ignore
    this.userPerformer.loadOne(json.UID).subscribe((obj)=>
      review.user=this.userPerformer.JsonToClassObject(<object>obj[0])
    )
    // @ts-ignore
    review.title=json.title
    return review
  }

  public async addReview(review: Review, club: Club){
    await this.persistent.collection(review.constructor.name).add(this.ReviewToJson(review,club)).then(
      (doc)=> this.persistent.doc(Review.name + "/" + doc.id).update({id: doc.id})
    );
  }

  public async deleteReview(id: string){
    this.persistent.doc(Review.name + "/" + id).delete().catch(
      (error) => console.log(error)
    )
  }

  public searchReview(id:string=null,idUser:string=null,idClub:string=null,mark:number=null) {
    let result=[]
    let whereClauses=[]

    if(id) whereClauses.push({field: 'id', op:<WhereFilterOp>'==', value: id})
    if(idUser)whereClauses.push({field: 'UID', op:<WhereFilterOp>'==', value: idUser})
    if(idClub)whereClauses.push({field: 'CID', op:<WhereFilterOp>'==',value: idClub})
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

}
