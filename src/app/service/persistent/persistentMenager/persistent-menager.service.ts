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
import {UserPerformerService} from "../persistentPerformer/userPerformer/user-performer.service";
import {Observable} from "rxjs";
import {MatchPerformerService} from "../persistentPerformer/matchPerformer/match-performer.service";
import {ClubPerformerService} from "../persistentPerformer/clubPerformer/club-performer.service";
import {switchMap} from "rxjs/operators";

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

  async store(toBeStored ,id: string=null) {
    let result:string
    await this.getPersistentPerformer(toBeStored.constructor.name).store(toBeStored,id).then(
      (id)=>result=id
    )
    return result
  }

  async update(toBeStored){
    await this.getPersistentPerformer(toBeStored.constructor.name).update(toBeStored)
  }

  public loadOne(className : string , id: string): Observable<any>{
    return this.getPersistentPerformer(className).load(id)
  }

  public loadAll(className : string): Observable<any>{
    return this.getPersistentPerformer(className).loadAll()
  }

  public async setClubMatch(idMatch:string,idClub:string){
    await this.matchPerformer.setClubMatch(idMatch, idClub)
  }

  public getClubMatch(idMatch:string){
    return this.matchPerformer.getClubMatchId(idMatch).pipe(switchMap(
      (idClub)=>this.clubPerformer.loadOne(idClub)
    ))
  }

  async addFollower(idFollowed:string,idFollower:string){
    await this.userPerformer.addFollower(idFollowed,idFollower)
  }

  getFolloweds(idFollower:string){
    return this.userPerformer.getFolloweds(idFollower)
  }

  getFollowers(idFollowed:string){
    return this.userPerformer.getFollowers(idFollowed)
  }

  deleteFollowed(idFollower:string){
    this.userPerformer.deleteFollowed(idFollower)
  }

  existFollower(idFollowed:string,idFollower:string){
    return this.userPerformer.existFollower(idFollowed, idFollower)
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

  public getMatchOfFollowee(idUser){
    this.matchPerformer.getMatchOfFollowee(idUser)
  }

  public addUserToClub(idUser:string,idClub:string){
    this.userPerformer.addUserToClub(idUser, idClub)
  }

  public getUserClub(idUser:string){
    let idClub=this.userPerformer.getUserClubId(idUser)
    return this.clubPerformer.loadOne(idClub)
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

  public async addComment( comment:Comment ,match: Match ,idUser: string=null){
    await this.matchPerformer.addComment(comment, match,idUser)
  }

  public async deleteComment(id: string){
    await this.matchPerformer.deleteComment(id)
  }

  public searchComment(id:string=null,idMatch:string=null,writerId:string=null,orderByField:string[]=null,orderByAscending:boolean[]=null) {
    return this.matchPerformer.searchComment(id, idMatch, writerId,orderByField,orderByAscending)
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
