import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  private reviews: FormGroup

  constructor(private router: Router) {
    this.reviews = new FormGroup({
      title: new FormControl(''),
      review: new FormControl('')
    })
  }

  showClub(){
    this.router.navigate(['./tabs','homeclub'])
  }

  ngOnInit() {
  }

  submit(){

  }

}
