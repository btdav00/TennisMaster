import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectplayerPageRoutingModule } from './selectplayer-routing.module';

import { SelectplayerPage } from './selectplayer.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectplayerPageRoutingModule
    ],
    exports: [
        SelectplayerPage
    ],
    declarations: [SelectplayerPage]
})
export class SelectplayerPageModule {}
