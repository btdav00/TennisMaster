import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {User} from "../../model/User";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {onAuthStateChanged} from "@angular/fire/auth";
import {PersistentMenagerService} from "../persistent/persistentMenager/persistent-menager.service";




@Injectable({
  providedIn: 'root'
})


export class AuthorizationService {

  private isauthorized: boolean
  private currentUserUid: string

  constructor(private auth: AngularFireAuth, private route: Router, private persistentMenager: PersistentMenagerService) {
    this.auth.onAuthStateChanged(user => {
      if (user) this.currentUserUid = user.uid;
      else this.currentUserUid = null;
    })
    if (this.currentUserUid == null) {
        this.auth.currentUser.then((user) => {
        if(user!=null)this.currentUserUid = user.uid
      })
    }
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email : string,password : string,user: User){
    let opsuccess=true;
    await this.auth.createUserWithEmailAndPassword(email,password).then(
      (result)=>{
        user.id=result.user.uid
        this.persistentMenager.store(user,user.id).then(
          ()=>{},
          (e)=>{
            console.log(e)
            this.logout().then(()=>{
              result.user.delete()
            })
            opsuccess=false;
          }
        )
      },
      (e)=>{
        console.log(e)
        opsuccess=false;
      })
    return opsuccess
  }


  public isLogged():boolean{
    if(this.currentUserUid!=null) return true ;
    else return false
  }

  async logout(){
    await this.auth.signOut()
  }

  public getCurrentUId(){
    return this.currentUserUid
  }


}
