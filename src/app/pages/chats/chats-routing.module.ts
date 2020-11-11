import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

import { ChatsPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsPage
  },
  {
    path: ':chat',
    component: ChatViewComponent
  },
  {
    path: ':chat/info',
    component: ChatInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule { }
