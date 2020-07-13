import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelsPage } from './channels.page';

import { ChannelsPageRoutingModule } from './channels-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChannelsPageRoutingModule
  ],
  declarations: [ChannelsPage]
})
export class ChannelsPageModule { }
