import { Component, Input, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match'

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  @Input() match : Match

  constructor() { }

  ngOnInit() {
  }

}
