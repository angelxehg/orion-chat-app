import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendCreatePageRoutingModule } from './friend-create-routing.module';

import { FriendCreatePage } from './friend-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendCreatePageRoutingModule
  ],
  declarations: [FriendCreatePage]
})
export class FriendCreatePageModule {}
