import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectgeneralPageRoutingModule } from './selectgeneral-routing.module';

import { SelectgeneralPage } from './selectgeneral.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectgeneralPageRoutingModule
    ],
    exports: [
        SelectgeneralPage
    ],
    declarations: [SelectgeneralPage]
})
export class SelectgeneralPageModule {}
