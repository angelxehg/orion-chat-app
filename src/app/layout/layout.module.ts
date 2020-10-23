import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPageRoutingModule } from './layout-routing.module';

import { LayoutPage } from './layout.page';
import { TabsComponent } from './tabs/tabs.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule
  ],
  declarations: [
    LayoutPage,
    TabsComponent,
    MenuComponent
  ]
})
export class LayoutPageModule { }
