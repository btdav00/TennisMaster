import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateService} from "../../../service/manageObject/date/date.service";

@Component({
  selector: 'app-selectgeneral',
  templateUrl: './selectgeneral.page.html',
  styleUrls: ['./selectgeneral.page.scss'],
})
export class SelectgeneralPage implements OnInit {


  public labelDate="Data della partita"
  public showCal =false;
  @Input() date : Date
  @Output() outputDate =new EventEmitter<Date>();
  @Input() type : String
  @Output() outputType= new EventEmitter<String>();


  constructor( private dateservice: DateService) {

  }

  ngOnInit() {
    console.log(this.type)
    if(this.date!=null){
      this.labelDate='data del match : '+ this.dateservice.getStringDate(this.date);
    }
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){

    this.date= new Date(dateinput);
    this.labelDate='data del match : '+this.dateservice.getStringDate(this.date);
    this.showCalendar()
    this.outputDate.emit(this.date)
  }

  getDateValue(){
    if (this.date){
      return this.date.toISOString()
    }
    else new Date().toISOString()
  }

  getToday(){
    return new Date().toISOString()
  }

  sendType(){
    console.log(this.type)
    this.outputType.emit(this.type)
  }

}
