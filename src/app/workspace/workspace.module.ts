import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspacePage } from './workspace.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WorkspacePageRoutingModule } from './workspace-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WorkspacePageRoutingModule
  ],
  declarations: [WorkspacePage]
})
export class WorkspacePageModule { }
