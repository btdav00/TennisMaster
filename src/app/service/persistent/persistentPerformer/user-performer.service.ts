import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserPerformerService {

  constructor(private persistent:AngularFirestore , private database:AngularFireDatabase) { }

  private static JsonToClassObject(json):User{
    let obj=<object>json;
    let user= new User()
    // @ts-ignore
    user.id=obj.id
    // @ts-ignore
    user.name=obj.name
    // @ts-ignore
    user.surname=obj.surname
    // @ts-ignore
    user.birthdate=new Date(<number>obj.birthdate)
    return user
  }

  private static ClassObjectToJson(user : User):object{
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      birthdate: user.birthdate.getTime()
    }
  }

  async store(toBeStored : User,id: string){
    await this.persistent.collection(toBeStored.constructor.name).doc(id).set(UserPerformerService.ClassObjectToJson(toBeStored));
  }

  public async load(id: string){
    let result=null
    await this.persistent.collection(User.name).valueChanges().subscribe(
      (value) => {
        result=UserPerformerService.JsonToClassObject(value[0])
      },
      (e)=>{
        console.log('load error')
      }
    )
    return result

  }
}
