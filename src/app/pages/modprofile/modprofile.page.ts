import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl, AbstractControl,} from '@angular/forms';
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";

@Component({
  selector: 'app-modprofile',
  templateUrl: './modprofile.page.html',
  styleUrls: ['./modprofile.page.scss'],
})
export class ModprofilePage implements OnInit {

  credential: FormGroup;
  personalData: FormGroup;
  auth: FormGroup;
  private date: Date;
  public showCal =false;

  constructor( private authorization: AuthorizationService, private persistent: PersistentMenagerService) {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
    this.personalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
    });
    this.auth = new FormGroup({
      authemail: new FormControl(''),
      authpassword: new FormControl(''),
    })
  }

  ngOnInit() {
    let userId = this.authorization.getCurrentUId()
    //carica l'utente dall'id e caricane l'attuale data di nascita
  }

  getToday(){
    return new Date().toISOString()
  }

  getDateValue(){
    if (this.date){
      return this.date.toISOString()
    }
    else new Date().toISOString()
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  submit() {
    let updated=new User()
    updated.name = this.personalData.value.name
    updated.surname = this.personalData.value.surname
    if(this.credential.value.password == this.credential.value.confirmPassword){
      this.authorization.updateProfile(null,this.credential.value.password)
    }
    updated.birthdate = this.date
    updated.id = this.authorization.getCurrentUId()
    this.persistent.update(updated)
  }

}
