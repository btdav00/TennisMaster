import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getStringDate(date:Date):string{
    let  day= <unknown>date.getUTCDate()
    let month= <unknown>(date.getMonth()+1)
    let year= <unknown>date.getFullYear()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    return day+'/'+month+'/'+year
  }

  public getStringTime(date:Date , hourPlus:number=0):string{
    let hours=date.getUTCHours()+hourPlus
    let minutes=date.getUTCMinutes()
    let seconds=date.getUTCSeconds()
    return hours+":"+minutes+":"+seconds
  }

  public getEndDay(date:Date):Date{
    let  day= date.getUTCDate()
    let month= date.getMonth()
    let year= date.getFullYear()
    return new Date(year,month,day+1,0,0,0,0)
  }

  public getStartDay(date:Date):Date{
    let  day= date.getUTCDate()
    let month= date.getMonth()
    let year= date.getFullYear()
    return new Date(year,month,day,0,0,0,0)
  }
}
