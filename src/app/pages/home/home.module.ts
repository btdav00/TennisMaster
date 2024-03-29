import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {PartitePageModule} from "../partite/partite.module";
import {NotificationsPageModule} from "../notifications/notifications.module";
import {MybookingsPageModule} from "../mybookings/mybookings.module";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, PartitePageModule, NotificationsPageModule, MybookingsPageModule],
  declarations: [HomePage],
})
export class HomePageModule {}
