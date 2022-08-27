import { Injectable } from '@angular/core';
import firebase from "firebase/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {User} from "../../model/User";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {onAuthStateChanged} from "@angular/fire/auth";




@Injectable({
  providedIn: 'root'
})


export class AuthorizationService {

  private store: AngularFirestore
  private isauthorized: boolean

  constructor(private auth: AngularFireAuth, private route: Router){
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

  public async logout(){
    await this.auth.signOut().then(result => {
      console.log(result);
      this.route.navigate(['login'])
    }, ()=>console.log("fottuti"))
  }

  /*
  public logout1(){
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e)=>{
      e.preventDefault();
      this.auth.signOut.then(() => {
        console.log('logout succesfull')
      })
    })
  }
   */
}
