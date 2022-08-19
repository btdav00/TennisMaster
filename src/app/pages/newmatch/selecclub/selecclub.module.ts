import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecclubPageRoutingModule } from './selecclub-routing.module';

import { SelecclubPage } from './selecclub.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelecclubPageRoutingModule
    ],
    exports: [
        SelecclubPage
    ],
    declarations: [SelecclubPage]
})
export class SelecclubPageModule {}
