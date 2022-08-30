import {Club} from "./Club";
import {Court} from "./Court";

export class Booking {
  public payment: boolean;
  public club : Club
  public date : Date
  public time: number
  public court : Court
  public reservated : boolean
  constructor() {
    this.reservated = false
  }
}
