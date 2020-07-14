import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelPageRoutingModule } from './panel-routing.module';

import { PanelPage } from './panel.page';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelPageRoutingModule
  ],
  declarations: [PanelPage, MainMenuComponent]
})
export class PanelPageModule { }
