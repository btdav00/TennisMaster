import {Club} from "./Club";
import {Court} from "./Court";

export class Booking {
  public id: string
  public payment: boolean;
  public date : Date
  public courtNumber : number
  public startHour: number
  public numberHour: number
  constructor() {}
}
