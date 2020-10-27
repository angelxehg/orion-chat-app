import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevPalettePageRoutingModule } from './dev-palette-routing.module';

import { DevPalettePage } from './dev-palette.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DevPalettePageRoutingModule
  ],
  declarations: [DevPalettePage]
})
export class DevPalettePageModule { }
