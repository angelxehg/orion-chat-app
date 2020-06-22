import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelsPage } from './channels.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChannelsPageRoutingModule } from './channels-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChannelsPageRoutingModule
  ],
  declarations: [ChannelsPage]
})
export class ChannelsPageModule { }
