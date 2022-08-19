import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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


  constructor() { }

  ngOnInit() {
    if(this.date!=null){
      let  day= <unknown>this.date.getUTCDate()
      let month= <unknown>(this.date.getMonth()+1)
      let year= <unknown>this.date.getFullYear()
      if(day<10){
        day= "0"+day
      }
      if(month<10){
        month= "0"+month
      }
      this.labelDate='data di nascita : '+day+"/"+month+"/"+this.date.getFullYear();
    }
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){

    this.date= new Date(dateinput);
    let  day= <unknown>this.date.getUTCDate()
    let month= <unknown>(this.date.getMonth()+1)
    let year= <unknown>this.date.getFullYear()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    this.labelDate='data di nascita : '+day+"/"+month+"/"+this.date.getFullYear();
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
    this.outputType.emit(this.type)
  }

}
