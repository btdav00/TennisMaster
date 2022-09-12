import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsPageService {

  private page : string

  constructor() { }

  setPage(page : string){
    this.page=page
  }

  getPage():string{
    if(this.page)return this.page
    else return ''
  }
}
