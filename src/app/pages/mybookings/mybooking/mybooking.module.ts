import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybookingPageRoutingModule } from './mybooking-routing.module';

import { MybookingPage } from './mybooking.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MybookingPageRoutingModule
    ],
    exports: [
        MybookingPage
    ],
    declarations: [MybookingPage]
})
export class MybookingPageModule {}
