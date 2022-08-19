import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmatchPageRoutingModule } from './addmatch-routing.module';

import { AddmatchPage } from './addmatch.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddmatchPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddmatchPage]
})
export class AddmatchPageModule {}
