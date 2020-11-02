import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatViewComponent } from './chat-view/chat-view.component';

import { ChatsPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsPage
  },
  {
    path: ':car',
    component: ChatViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule { }
