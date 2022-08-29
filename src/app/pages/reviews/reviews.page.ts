import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  constructor(private router: Router) { }

  showClub(){
    this.router.navigate(['./tabs','homeclub'])
  }

  ngOnInit() {
  }

}
