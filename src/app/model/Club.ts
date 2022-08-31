import { Place } from './Place';
import {Schedule} from "./Schedule";
import {Review} from "./Review";
import {Court} from "./Court";
import {Booking} from "./Booking";
export class Club {
  public id: string
  public name: string;
  public place: Place;
  public courts: Court[]
  constructor() {}
}
