import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspacesPage } from './workspaces.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { WorkspacesPageRoutingModule } from './workspaces-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WorkspacesPageRoutingModule
  ],
  declarations: [WorkspacesPage]
})
export class WorkspacesPageModule { }
