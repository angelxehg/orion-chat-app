import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspacesPage } from './workspaces.page';

import { WorkspacesPageRoutingModule } from './workspaces-routing.module';
import { WorkspaceMenuComponent } from 'src/app/components/workspace-menu/workspace-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WorkspacesPageRoutingModule
  ],
  declarations: [WorkspacesPage, WorkspaceMenuComponent]
})
export class WorkspacesPageModule { }
