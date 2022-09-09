import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  private idPayment

  constructor() { }

  ngOnInit() {
  }

  changeMetod(val: number){
    this.idPayment = val
  }

}
