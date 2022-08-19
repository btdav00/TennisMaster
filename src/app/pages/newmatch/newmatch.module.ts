import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewmatchPageRoutingModule } from './newmatch-routing.module';

import { NewmatchPage } from './newmatch.page';
import {SelecclubPageModule} from "./selecclub/selecclub.module";
import {SelectplayerPageModule} from "./selectplayer/selectplayer.module";
import {SelectgeneralPageModule} from "./selectgeneral/selectgeneral.module";
import {SelectsetPageModule} from "./selectset/selectset.module";
import {ShowsummaryPageModule} from "./showsummary/showsummary.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewmatchPageRoutingModule,
        ReactiveFormsModule,
        SelecclubPageModule,
        SelectplayerPageModule,
        SelectgeneralPageModule,
        SelectsetPageModule,
        ShowsummaryPageModule
    ],
  declarations: [NewmatchPage]
})
export class NewmatchPageModule {}
