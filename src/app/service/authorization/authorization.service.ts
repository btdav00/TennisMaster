import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {User} from "../../model/User";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {onAuthStateChanged} from "@angular/fire/auth";
import {PersistentMenagerService} from "../persistent/persistentMenager/persistent-menager.service";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})


export class AuthorizationService {

  constructor(private auth: AngularFireAuth, private route: Router, private persistentMenager: PersistentMenagerService) {
    this.auth.onAuthStateChanged((user)=>{
      if(user)localStorage.setItem('userUid',user.uid)
      else localStorage.setItem('userUid','')
    })
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email : string,password : string,user: User){
    let opsuccess=true;
    await this.auth.createUserWithEmailAndPassword(email,password).then(
      (result)=>{
        this.persistentMenager.store(user,result.user.uid).then(
          ()=>{
            console.log('registration success')
          },
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
    console.log(localStorage.getItem('userUid'))
    if(<string>localStorage.getItem('userUid')!="") {
      console.log('perchè')
      return true ;
    }
    else return false
  }

  async logout(){
    await this.auth.signOut()
  }

  public getCurrentUId(){
    return localStorage.getItem('userUid')
  }


}
