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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credential: FormGroup;

  constructor() {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  get email() {
    return this.credential.get('email');
  }

  get password() {
    return this.credential.get('password');
  }
}
let a=1;
