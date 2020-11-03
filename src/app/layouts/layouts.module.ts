import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HybridLayoutComponent } from './hybrid-layout/hybrid-layout.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ChatsPageModule } from '../pages/chats/chats.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HybridLayoutComponent,
    TabsComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ChatsPageModule
  ],
  exports: [
    HybridLayoutComponent
  ]
})
export class LayoutsModule { }
