import { Injectable } from '@angular/core';
import {Match} from "../../../model/Match";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }

  resultMatch(match: Match,required=null , mood='number') {

    let point1 = 0
    let point2 = 0
    for (let item of match.sets) {
      if (item.gamesPlayer1 > item.gamesPlayer2) point1 = point1 + 1
      if (item.gamesPlayer2 > item.gamesPlayer1) point2 = point2 + 1
    }
    if (required == null){
      if (mood=="string") return point1+"-"+point2
      else return [point1, point2]
    }
    else if (required == 2) return point2
    else return point1
  }
}
