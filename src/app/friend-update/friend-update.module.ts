import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendUpdatePageRoutingModule } from './friend-update-routing.module';

import { FriendUpdatePage } from './friend-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendUpdatePageRoutingModule
  ],
  declarations: [FriendUpdatePage]
})
export class FriendUpdatePageModule {}
