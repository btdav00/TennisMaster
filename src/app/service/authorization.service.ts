import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;
import {User} from "../model/User";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private auth: Auth) { }

  async login(email: string, password: string){
    try{
      const userFire = signInWithEmailAndPassword(this.auth, email, password);
      return userFire;
    }
    catch(e){
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }

  async register(user: User){
    try{
      const userFire = createUserWithEmailAndPassword(this.auth, user.email, user.password);
      return userFire;
    }
    catch(e){
      return null;
    }
  }
}
