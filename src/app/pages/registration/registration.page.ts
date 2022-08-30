import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarPage } from '../calendar/calendar.page';
import { format , parseISO } from 'date-format';
import {User} from "../../model/User";
import {AuthorizationService} from "../../service/authorization/authorization.service";




@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public credential: FormGroup;
  public personalData: FormGroup;
  public labelDate="Data di nascita"
  public date : Date;
  public showCal =false;











  constructor(private authService: AuthorizationService,private route: Router,private loadingController: LoadingController) {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
    this.personalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      date: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){

    this.date= new Date(dateinput);
    let  day= <unknown>this.date.getUTCDate()
    let month= <unknown>(this.date.getMonth()+1)
    let year= <unknown>this.date.getFullYear()
    if(day<10){
       day= "0"+day
    }
    if(month<10){
       month= "0"+month
    }
    this.labelDate='data di nascita : '+day+"/"+month+"/"+this.date.getFullYear();
    this.showCalendar()
  }

  getDateValue(){
    if (this.date){
      return this.date.toISOString()
    }
    else new Date().toISOString()
  }

  getToday(){
    return new Date().toISOString()
  }

  async submit(){
    let user=new User()
    user.name=this.personalData.value.name
    user.surname=this.personalData.value.surname
    user.birthdate=this.date
    let email=this.credential.value.email
    let password=this.credential.value.password

    const loading= await this.loadingController.create()
    await loading.present()

    this.authService.register(email,password,user).then(
      (result) => {
        if(result)this.route.navigateByUrl('/login', {replaceUrl: true});
        else console.log('register do not success')
        loading.dismiss();
        },
      (err) => {
        console.log(err)
        loading.dismiss();
      })

  }

}
