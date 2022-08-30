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
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credential: FormGroup;
  error: boolean






  constructor(private route: Router,private authService: AuthorizationService,private loadingController: LoadingController) {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.error=false
  }

  ngOnInit() {
  }

  reset(){
    this.credential.reset()
    this.error=false
  }

  get email() {
    return this.credential.get('email').value;
  }

  get password() {
    return this.credential.get('password').value;
  }

  async submit() {

    const loading= await this.loadingController.create()
    await loading.present()
    this.authService.login(this.email,this.password).then((result) => {
        if (result) this.route.navigate(['tabs']);
        loading.dismiss();
        this.reset()
      },
      (err) => {
        this.error=true;
        console.log(err)
        loading.dismiss();
      })
  }
}

