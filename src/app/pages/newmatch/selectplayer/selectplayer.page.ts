import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";

@Component({
  selector: 'app-selectplayer',
  templateUrl: './selectplayer.page.html',
  styleUrls: ['./selectplayer.page.scss'],
})
export class SelectplayerPage implements OnInit {

  public list: Array<Object>=[];
  public searchedItem: any;
  public teamNumber: number
  @Input() typeMatch: String
  @Input() team1: User[]
  @Input() team2: User[]
  @Output() outputTeam1= new EventEmitter<User[]>();
  @Output() outputTeam2= new EventEmitter<User[]>();



  constructor() {
    let Roberto=new User()
    Roberto.name="Roberto"
    Roberto.surname="Di Stefano"
    let Davide=new User()
    Davide.name="Davide"
    Davide.surname="Battistone"
    let Carla=new User()
    Carla.name="Carla"
    Carla.surname="Di Stefano"
    let Gloria=new User()
    Gloria.name="Gloria"
    Gloria.surname="Marinelli"
    let Lorenzo=new User()
    Lorenzo.name="Lorenzo"
    Lorenzo.surname="Di Stefano"

    this.list=[
      Roberto,
      Carla,
      Davide,
      Gloria,
      Lorenzo
    ]

    this.searchedItem=this.list
  }

  ngOnInit() {

  }

  _ionChange(event){
    const val=event.target.value;

    if(val && val!=''){
      this.searchedItem=this.list.filter((item: any)=>{
        let test=item.name+" "+item.surname
        return (test.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }
    else if(val=='')this.searchedItem=this.list
  }

  addPlayer(player){
    if(this.typeMatch=='doppio'){
      if(this.teamNumber==1) {
        if (this.team1.length == 0 || (this.team1.length == 1 && this.team1[0] != player)) {
          this.team1.push(player)
        }
        else if (this.team1.length != 1) {
          this.team1[1] = this.team1[0]
          this.team1[0] = player
        }
      }
      else{
        if(this.team2.length==0 || (this.team2.length == 1 && this.team2[0] != player)){
          this.team2.push(player)
        }
        else if (this.team2.length != 1){
          this.team2[1]=this.team2[0]
          this.team2[0]=player
        }
      }
    }
    else{
      if(this.teamNumber==1){
        this.team1=[player]
      }
      else{
        this.team2=[player]
      }
    }
    this.send()
  }

  private send(){
    this.outputTeam1.emit(this.team1)
    this.outputTeam2.emit(this.team2)
  }


  setTeam(numberTeam){
    this.teamNumber=numberTeam
  }

}
