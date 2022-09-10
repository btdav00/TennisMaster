import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Club} from "../../../model/Club";
import {Place} from "../../../model/Place";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";


@Component({
  selector: 'app-selecclub',
  templateUrl: './selecclub.page.html',
  styleUrls: ['./selecclub.page.scss'],
})
export class SelecclubPage implements OnInit {

  public list: Array<Club>=[];
  public searchedItem: Array<Club>;
  @Input() selectedItem: Club;
  @Output() selected=new EventEmitter<Club>();



  constructor(private persistent:PersistentMenagerService) {}

  ngOnInit() {
    this.persistent.loadAll(Club.name).subscribe(
      (obj)=>{
        this.list=this.persistent.eval(Club.name,<object[]>obj)
        this.searchedItem=this.list
      }
    )
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

}
