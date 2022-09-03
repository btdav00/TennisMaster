import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";
import {getDownloadURL, getStorage, ref, uploadString} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {setDoc} from "@angular/fire/firestore";
import {PersistentMenagerService} from "../persistent/persistentMenager/persistent-menager.service";

@Injectable({
  providedIn: 'root'
})
export class StorageImgService {

  constructor( private fs: AngularFirestore , private persistent: PersistentMenagerService) { }

  public async catchImgCamera(){
    return  await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    })
  }

  public async uploadImg(image:Photo,classNameReference: string,idReference: string ){
    if(image){
      const path='img/'+classNameReference+'/'+idReference
      const storage=getStorage()
      const storageRef = ref(storage,path)
      await uploadString(storageRef,image.base64String,'base64').then(
        async () => {
          const imgUrl = await getDownloadURL(storageRef)
          await this.persistent.addImg(classNameReference,idReference,imgUrl)
        },
        (e)=>{throw new Error('upload error : '+e)}
      )
    }
    else throw new Error('upload error : immage do not seted')
  }

  public getImgSource(classNameReference: string,idReference: string ){
    return this.persistent.getImg(classNameReference,idReference)
  }
}
