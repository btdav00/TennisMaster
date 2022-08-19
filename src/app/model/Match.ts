import { Set } from './Set';
import { User } from './User';

export class Match {
  public player1: User[]; //player could be a team of 2 players
  public player2: User[];
  public type: String;
  public sets: Set[];
  public date: Date;
  constructor() {}
}
