import { Place } from './Place';
import {Court} from "./Court";
export class Club {
  public name: string;
  public place: Place;
  public id: string;
  public courts: Court[];
  public times: number[];
  constructor() {}
}
