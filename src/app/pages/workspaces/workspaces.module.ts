import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspacesPage } from './workspaces.page';

import { WorkspacesPageRoutingModule } from './workspaces-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WorkspacesPageRoutingModule
  ],
  declarations: [WorkspacesPage]
})
export class WorkspacesPageModule { }
