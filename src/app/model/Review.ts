import { User } from './User';

export class Review {
  public id: string
  public mark: number;
  public user: User;
  public title: string;
  public comment: string;
  constructor() {}
}
