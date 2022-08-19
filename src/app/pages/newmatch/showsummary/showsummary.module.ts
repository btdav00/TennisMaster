import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowsummaryPageRoutingModule } from './showsummary-routing.module';

import { ShowsummaryPage } from './showsummary.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowsummaryPageRoutingModule
    ],
    exports: [
        ShowsummaryPage
    ],
    declarations: [ShowsummaryPage]
})
export class ShowsummaryPageModule {}
