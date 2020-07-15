import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelPageRoutingModule } from './panel-routing.module';

import { PanelPage } from './panel.page';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { MainTabsComponent } from '../components/main-tabs/main-tabs.component';
import { ChannelMenuComponent } from '../components/channel-menu/channel-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelPageRoutingModule
  ],
  declarations: [PanelPage, MainMenuComponent, MainTabsComponent, ChannelMenuComponent]
})
export class PanelPageModule { }
