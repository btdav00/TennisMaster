import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Review} from "../../model/Review";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import firebase from "firebase/compat";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {Club} from "../../model/Club";
import {Booking} from "../../model/Booking";
import {MyinputService} from "../../service/input/myinput.service";
import {getNumberOfCurrencyDigits} from "@angular/common";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  user: User
  currentClub: Club
  arrayReviews: Review[]
  public reviews: FormGroup
  selected: any

  constructor(private router: Router, private auth: AuthorizationService, private persistentMenager: PersistentMenagerService, private myinput: MyinputService) {
    this.reviews = new FormGroup({
      title: new FormControl(''),
      rev: new FormControl('')
    })
  }

  ngOnInit() {
    //@ts-ignore
    this.currentClub = this.myinput.getInput().club
    this.clubReviews()
    this.persistentMenager.loadOne(User.name, this.auth.getCurrentUId()).subscribe(
      (object)=>{this.user=this.persistentMenager.eval(User.name, object, true)}
    )
  }

  showClub(){
    this.router.navigate(['./tabs','homeclub'])
  }

  clubReviews(){
    this.persistentMenager.searchReview(null, null, this.currentClub.id, null).subscribe(
      (object)=>{
        this.arrayReviews = this.persistentMenager.eval(Review.name, object, false)
      }
    )
  }


  submit(){
    let review = new Review()
    review.comment = this.reviews.value.rev
    review.title = this.reviews.value.title
    review.user = this.user
    this.persistentMenager.addReview( review, this.currentClub)
  }

  changeSelected(id: string){
    this.selected = id
  }

}
