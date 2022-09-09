import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Review} from "../../model/Review";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import firebase from "firebase/compat";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {Club} from "../../model/Club";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  user: User
  currentClub: Club
  arrayReviews: []

  private reviews: FormGroup

  constructor(private router: Router, private auth: AuthorizationService, private persistentMenager: PersistentMenagerService) {
    this.reviews = new FormGroup({
      title: new FormControl(''),
      rev: new FormControl('')
    })
  }

  showClub(){
    this.router.navigate(['./tabs','homeclub'])
  }

  ngOnInit() {
    let userId = this.auth.getCurrentUId()
    this.persistentMenager.loadOne(User.name, userId).subscribe(
      (users)=>{
        this.user = this.persistentMenager.eval(User.name, users, true)
      }
    )
    this.currentClub = this.persistentMenager.getUserClub(userId)
  }

  clubReviews(){
    this.arrayReviews = this.persistentMenager.loadReview(this.currentClub.name)
  }

  submit(){
    let review = new Review()
    review.comment = this.reviews.value.rev
    review.title = this.reviews.value.title
    review.user = this.user
    this.persistentMenager.addReview( review, this.currentClub)
  }

}
