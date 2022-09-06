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
  }

  submit() {
    let updated=new User()
    updated.name = this.personalData.value.name
    updated.surname = this.personalData.value.surname
    if(this.credential.value.password == this.credential.value.confirmPassword){
      this.authorization.updateProfile(null,this.credential.value.password)
    }
    updated.id = this.authorization.getCurrentUId()
    this.persistent.update(updated)
  }

}
