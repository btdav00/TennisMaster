import {Club} from "./Club";
import {Court} from "./Court";

export class Booking {
  public payment: boolean;
  public houorsNumber: number;
  public club : Club
  public date : Date
  public court : Court
  constructor() {}
}
