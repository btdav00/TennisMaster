import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {User} from "../../model/User";
import {environment} from "../../../environments/environment";




@Injectable({
  providedIn: 'root'
})


export class AuthorizationService {

  private store: AngularFirestore
  private isauthorized: boolean

  constructor(private auth: AngularFireAuth){
    this.isauthorized=false
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email : string,password : string,user: User){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }

  public isLogged():boolean{
    if(this.auth.currentUser) return true ;
    else return false
  }
}
