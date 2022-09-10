import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl, AbstractControl,} from '@angular/forms';
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {DateService} from "../../service/manageObject/date/date.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modprofile',
  templateUrl: './modprofile.page.html',
  styleUrls: ['./modprofile.page.scss'],
})
export class ModprofilePage implements OnInit {

  credential: FormGroup;
  personalData: FormGroup;
  auth: FormGroup;
  public labelDate: string;
  private date: Date;
  public showCal =false;
  public currentUser: User;

  constructor( private authorization: AuthorizationService, private persistent: PersistentMenagerService, private dateservice: DateService, private route: Router) {
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
    this.labelDate = "Nuova data di nascita"
  }

  ngOnInit() {
    let userId = this.authorization.getCurrentUId()
    this.persistent.loadOne(User.name, userId).subscribe(
      (object)=>{this.currentUser=this.persistent.eval(User.name, object, true)
      })
  }

  getToday(){
    return new Date().toISOString()
  }

  getDateValue(date: Date){
    if (date){
      return date.toISOString()
    }
    else new Date().toISOString()
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){

    this.date= new Date(dateinput);
    this.labelDate='data di nascita : '+ this.dateservice.getStringDate(this.date)
    this.showCalendar()
  }


  submit() {
    let updated=new User()
    updated.id = this.currentUser.id
    updated.imgUrl = this.currentUser.imgUrl
    if(this.personalData.value.name){
      updated.name = this.personalData.value.name
    }else updated.name = this.currentUser.name
    if(this.personalData.value.surname){
      updated.surname = this.personalData.value.surname
    }else updated.surname = this.currentUser.surname
    if(this.credential.value.password && this.credential.value.confirmPassword){
      if(this.credential.value.password == this.credential.value.confirmPassword){
        this.authorization.updateProfile(null,this.credential.value.password)
      }
    }
    if(this.credential.value.email){
      this.authorization.updateProfile(this.credential.value.email, null)
    }
    if(this.date){
      updated.birthdate = this.date
    }else updated.birthdate = this.currentUser.birthdate
    console.log(updated)
    this.persistent.update(updated)
    this.route.navigate(['tabs'])
  }

}
