import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartitePageRoutingModule } from './partite-routing.module';

import { PartitePage } from './partite.page';
import {MatchPageModule} from "./match/match.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PartitePageRoutingModule,
        MatchPageModule
    ],
  exports: [
    PartitePage
  ],
  declarations: [PartitePage]
})
export class PartitePageModule {}
