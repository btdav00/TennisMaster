import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Club} from "../../../model/Club";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../data.service";

@Component({
  selector: 'app-searchplayer',
  templateUrl: './searchplayer.page.html',
  styleUrls: ['./searchplayer.page.scss'],
})
export class SearchplayerPage implements OnInit {

  public list: Array<Object>=[];
  public searchedItem: any;
  @Input() selectedItem: Club;
  @Output() selected=new EventEmitter<Club>();
  fromTabs: boolean

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentFrom.subscribe(fromTabs => this.fromTabs = fromTabs)
  }

  _ionChange(event){
    const val=event.target.value;

    if(val && val!=''){
      this.searchedItem=this.list.filter((item: any)=>{
        let test=item.name
        return (test.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }
    else if(val=='')this.searchedItem=this.list
  }

  sendSelected(value:Club){
    this.selectedItem=value
    this.selected.emit(value)
  }

  sendFrom() {
    this.data.changeFromTabs(false)
  }


}
