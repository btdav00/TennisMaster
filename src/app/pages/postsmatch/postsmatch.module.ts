import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsmatchPageRoutingModule } from './postsmatch-routing.module';

import { PostsmatchPage } from './postsmatch.page';

import {AutosizeModule} from "ngx-autosize";
import {PostPageModule} from "./post/post.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    PostsmatchPageRoutingModule,
    PostPageModule
  ],
  declarations: [PostsmatchPage]
})
export class PostsmatchPageModule {}
