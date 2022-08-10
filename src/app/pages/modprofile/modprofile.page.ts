import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-modprofile',
  templateUrl: './modprofile.page.html',
  styleUrls: ['./modprofile.page.scss'],
})
export class ModprofilePage implements OnInit {

  credential: FormGroup;
  personalData: FormGroup;
  auth: FormGroup;

  constructor() {
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

  submit() {
  }

  ngOnInit() {
  }

}
