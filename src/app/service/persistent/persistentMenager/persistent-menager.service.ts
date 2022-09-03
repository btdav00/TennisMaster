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
import {ClubPerformerService} from "../persistentPerformer/clubPerformer/club-performer.service";

@Injectable({
  providedIn: 'root'
})
export class PersistentMenagerService {

  constructor(private userPerformer : UserPerformerService, private matchPerformer : MatchPerformerService , private clubPerformer : ClubPerformerService) { }

  private getPersistentPerformer(modelClass : string){
    let result=null;
    switch (modelClass) {
      case User.name :
        result=this.userPerformer
        break;
      case Notification.name:
        result=this.userPerformer
        break;
      case Club.name:
        result=this.clubPerformer
        break;
      case Review.name:
        result=this.clubPerformer
        break;
      case Schedule.name:
        result=this.clubPerformer
        break;
      case Booking.name:
        result=this.clubPerformer
        break;
      case Match.name:
        result= this.matchPerformer
        break;
      case Comment.name:
        result=this.matchPerformer
        break
    }
    return result
  }

  public eval(modelClass: string , objs : object[],returnFirst=false){
    let result=[]
    for (const obj of objs) {
      result.push(this.getPersistentPerformer(modelClass).eval(modelClass,obj))
    }
    if(returnFirst)return result[0]
    else return result
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

  public async addBooking(user: User,booking: Booking , club: Club , court: Court){
    await this.clubPerformer.addBooking(user,booking,club,court)
  }

  public async deleteBooking(id: string){
    await this.clubPerformer.deleteBooking(id)
  }

  public async addImg(className:string,id:string,url:string){
    await this.getPersistentPerformer(className).addImg(id, url)
  }

  public getImg(className:string,id:string):string{
    return  this.getPersistentPerformer(className).getImg(id)
  }

  public searchBooking(id:string=null,idUser:string=null,idClub:string=null,courtNumber:number=null,minDate:Date=null,maxDate:Date=null) {
    return this.clubPerformer.searchBooking(id,idUser,idClub,courtNumber,minDate,maxDate)
  }

  public existBooking(id:string=null,idUser:string=null,idClub:string=null,courtNumber:number=null,minDate:Date=null,maxDate:Date=null) {
    return this.clubPerformer.existBooking(id,idUser,idClub,courtNumber,minDate,maxDate)
  }

  public async addReview(review: Review, club: Club){
    await this.clubPerformer.addReview(review,club)
  }

  public async deleteReview(id: string){
    await this.clubPerformer.deleteReview(id)
  }

  public searchReview(id:string=null,idUser:string=null,mark:number=null) {
    return this.clubPerformer.searchReview(id, idUser, mark)
  }

  public existReview(id:string=null,idUser:string=null,mark:number=null) {
    return this.clubPerformer.existReview(id, idUser, mark)
  }

  public async addSchedule( schedule:Schedule ,club: Club ){
    await this.clubPerformer.addSchedule(schedule,club)
  }

  public async deleteSchedule(id: string){
    await this.clubPerformer.deleteSchedule(id)
  }

  public searchSchedule(id:string=null,idClub:string=null,minDate:Date=null,maxDate:Date=null) {
    return this.clubPerformer.searchSchedule(id,idClub,minDate,maxDate)
  }

  public existSchedule(id:string=null,idClub:string=null,minDate:Date=null,maxDate:Date=null) {
    return this.clubPerformer.existSchedule(id,idClub,minDate,maxDate)
  }

  public async addComment( comment:Comment ,match: Match ){
    await this.matchPerformer.addComment(comment, match)
  }

  public async deleteComment(id: string){
    await this.matchPerformer.deleteComment(id)
  }

  public searchComment(id:string=null,idMatch:string=null,writerId:string=null) {
    return this.matchPerformer.searchComment(id, idMatch, writerId)
  }

  public existComment(id:string=null,idMatch:string=null,writerId:string=null) {
    return this.matchPerformer.existComment(id, idMatch, writerId)
  }

  public async addNotification( notification:Notification ,user: User ){
    await this.userPerformer.addNotification(notification, user)
  }

  public async deleteNotification(id: string){
    await this.userPerformer.deleteNotification(id)
  }

  public searchNotification(id:string=null,idUser:string=null,referenceId:string=null) {
    return this.userPerformer.searchNotification(id, idUser, referenceId)
  }

  public existNotification(id:string=null,idUser:string=null,referenceId:string=null) {
    return this.userPerformer.existNotification(id, idUser, referenceId)
  }


}
