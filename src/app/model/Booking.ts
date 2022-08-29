import {Club} from "./Club";
import {Court} from "./Court";

export class Booking {
  public payment: boolean;
  public club : Club
  public date : Date
  public startHour: number
  public numberHour: number
  public court : Court
  constructor() {}
}
