import { Time } from '@angular/common';

export class Schedule {
  public type: string;
  public daysWeek: string[];
  public openingTime: Time;
  public closingTime: Time;
  public fristDate: Date;
  public lastDate: Date;
  constructor() {}
}
