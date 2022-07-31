import { Component, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match';

@Component({
  selector: 'app-partite',
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss'],
})
export class PartitePage implements OnInit {

  maches : Match[]

  constructor() { }

  ngOnInit() {
  }

}
