import { User } from './User';
import {Club} from "./Club";

export class Review {
  public id: string
  public user: User;
  public title: string;
  public comment: string;
  public club: Club
  constructor() {}
}
