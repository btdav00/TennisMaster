import { User } from './User';

export class Comment {
  public id: string
  public text: string;
  public writer: User;
  public time : Date;
  constructor() {}
}
