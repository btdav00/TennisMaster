import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Club} from "../../../model/Club";
import {Place} from "../../../model/Place";


@Component({
  selector: 'app-selecclub',
  templateUrl: './selecclub.page.html',
  styleUrls: ['./selecclub.page.scss'],
})
export class SelecclubPage implements OnInit {

  public list: Array<Object>=[];
  public searchedItem: any;
  @Input() selectedItem: Club;
  @Output() selected=new EventEmitter<Club>();



  constructor() {
    let Avezzano=new Club()
    Avezzano.name="Circolo di Avezzano"
    Avezzano.place=new Place()
    let Aquila=new Club()
    Aquila.name="Circolo di L'Aquila"
    Aquila.place=new Place()
    let Celano=new Club()
    Celano.name="Circolo di Celano"
    Celano.place=new Place()
    let Chieti=new Club()
    Chieti.name="Circolo di Chieti"
    Chieti.place=new Place()
    let Pescara=new Club()
    Pescara.name="Circolo di Pescara"
    Pescara.place=new Place()

    this.list=[
      Avezzano,
      Aquila,
      Celano,
      Chieti,
      Pescara
    ]

    this.searchedItem=this.list
  }

  ngOnInit() {}


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
