import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Set} from "../../../model/Set";


@Component({
  selector: 'app-selectset',
  templateUrl: './selectset.page.html',
  styleUrls: ['./selectset.page.scss'],
})
export class SelectsetPage implements OnInit {

  newSet: FormGroup;
  @Input() sets : Set[]
  @Output() outputSets = new EventEmitter<Set[]>();

  constructor() {
    this.newSet = new FormGroup({
      games1: new FormControl(''),
      games2: new FormControl('')
    });
  }

  ngOnInit() {}

  deleteSet(index){
    this.sets.splice(index,1)
    this.outputSets.emit(this.sets)
  }

  addSet(){
    if(this.sets.length<3){
      let set=new Set()
      set.gamesPlayer1=this.newSet.value.games1
      set.gamesPlayer2=this.newSet.value.games2
      this.sets.push(set)
      this.outputSets.emit(this.sets)
    }
  }

}
