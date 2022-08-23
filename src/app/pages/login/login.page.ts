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
import {AuthorizationService} from "../../service/authorization.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credential: FormGroup;
  private loadingController: LoadingController;
  private alertController: AlertController;
  private authService: AuthorizationService;
  private route: Router;

  constructor() {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  get email() {
    return this.credential.get('email').value;
  }

  get password() {
    return this.credential.get('password').value;
  }

  async submit() {
    const login = await this.loadingController.create()
    await login.present()
    const user = this.authService.login(this.email, this.password)
    await login.dismiss()

    if(user){
      this.route.navigateByUrl('/tabs', {replaceUrl: true})
    }
  }
}

