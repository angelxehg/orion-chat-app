import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpacesPageRoutingModule } from './spaces-routing.module';

import { SpacesPage } from './spaces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpacesPageRoutingModule
  ],
  declarations: [SpacesPage]
})
export class SpacesPageModule {}
