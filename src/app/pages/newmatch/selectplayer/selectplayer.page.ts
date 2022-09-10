import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../../service/authorization/authorization.service";

@Component({
  selector: 'app-selectplayer',
  templateUrl: './selectplayer.page.html',
  styleUrls: ['./selectplayer.page.scss'],
})
export class SelectplayerPage implements OnInit {

  public list: Array<User>;
  public searchedItem:  Array<User>;
  public teamNumber: number
  @Input() typeMatch: String
  @Input() team1: User[]
  @Input() team2: User[]
  @Output() outputTeams= new EventEmitter<object>();


  constructor(private persistent:PersistentMenagerService, private auth: AuthorizationService) {}

  ngOnInit() {
    this.persistent.loadAll(User.name).subscribe(
      (users)=>{
        this.list=this.persistent.eval(User.name,<object[]>users)
        console.log(this.list)
        this.searchedItem=this.list
      }
    )
    this.persistent.loadOne(User.name,this.auth.getCurrentUId()).subscribe(
      (obj)=>this.team1.push(this.persistent.eval(User.name,obj,true))
    )
    this.teamNumber=1
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

  justSelected(select:User):boolean{
    for (const player of this.team1) {
      if(player.id==select.id)return true
    }
    for (const player of this.team2) {
      if(player.id==select.id)return true
    }
    return false
  }

  addPlayer(player){
    if(! this.justSelected(player)){

      if(this.typeMatch=='doppio'){
        if(this.teamNumber==1) {
          if (this.team1.length <=1 ) {
            this.team1.push(player)
          }
          else {
            if(this.team1[1].id!=this.auth.getCurrentUId())this.team1[1] = player
            else{
              this.team1[0]=this.team1[1]
              this.team1[1] = player
            }
          }
        }
        else{
          if(this.team2.length<=1){
            this.team2.push(player)
          }
          else{
            this.team2[1]=this.team2[0]
            this.team2[0]=player
          }
        }
      }
      else if(this.teamNumber==2){
        this.team2=[player]
      }
      this.send()
    }
    else this.popPlayer(player)
  }

  private popPlayer(player:User){
    if(this.teamNumber==1){
      for (let i = 0; i < this.team1.length; i++) {
        if(this.team1[i].id==player.id && this.team1[i].id!=this.auth.getCurrentUId())this.team1.splice(i,1)
      }
    }
    else{
      for (let i = 0; i < this.team2.length; i++) {
        if(this.team2[i].id==player.id)this.team2.splice(i,1)
      }
    }
  }

  private send(){
    let output={
      team1:this.team1,
      team2:this.team2,
      teamNumber: this.teamNumber
    }


    this.outputTeams.emit(output)
  }


  setTeam(numberTeam){
    this.teamNumber=numberTeam
  }

}
