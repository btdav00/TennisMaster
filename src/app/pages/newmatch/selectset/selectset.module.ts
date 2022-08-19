import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectsetPageRoutingModule } from './selectset-routing.module';

import { SelectsetPage } from './selectset.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectsetPageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        SelectsetPage
    ],
    declarations: [SelectsetPage]
})
export class SelectsetPageModule {}
