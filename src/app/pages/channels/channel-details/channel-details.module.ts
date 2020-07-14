import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelDetailsPageRoutingModule } from './channel-details-routing.module';

import { ChannelDetailsPage } from './channel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelDetailsPageRoutingModule
  ],
  declarations: [ChannelDetailsPage]
})
export class ChannelDetailsPageModule {}
