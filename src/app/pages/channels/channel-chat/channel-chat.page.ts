import { Component, ViewChild } from '@angular/core';
import { IonContent, ToastController, AlertController } from '@ionic/angular';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from 'src/app/services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.page.html',
  styleUrls: ['./channel-chat.page.scss'],
})
export class ChannelChatPage {

  @ViewChild("chatContent") chatContent: IonContent;

  public channel: Channel;

  public newMessage: Message;

  public messages: Array<Message> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService,
    public chn: ChannelService,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.clear();
    this.clearMsg();
    for (let i = 1; i <= 20; i++) {
      var msg = {
        id: i,
        content: `Message ${i} with generated content. This is a message with generated content.`,
        mine_flag: i % 2 == 0
      }
      this.messages.push(msg);
    }
  }

  clearMsg() {
    this.newMessage = {
      id: 0,
      content: "",
      mine_flag: false
    }
  }

  get title() {
    return this.channel.title;
  }

  shownMessages() {
    return this.messages.reverse();
  }

  async loadMessages(event) {
    var l = this.messages.length;
    if (l < 100) {
      console.log('Loading data...');
      for (let i = l + 1; i <= l + 20; i++) {
        var msg = {
          id: i,
          content: `Message ${i} with generated content. This is a message with generated content.`,
          mine_flag: i % 2 == 0
        }
        this.messages.push(msg);
      }
      event.target.complete();
      console.log('Done');
    } else {
      console.log('No More Data');
      event.target.disabled = true;
    }
  }

  scrollToBottom() {
    this.chatContent.scrollToBottom(500);
  }

  sendMessage() {
    this.chatContent.scrollToBottom(500);
    this.clearMsg();
  }

  ionViewWillEnter() {
    this.clear();
    this.panel.show('channels', false);
    var param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (param) {
      var thisID = parseInt(param);
      this.chn.find(thisID).subscribe({
        next: (found) => {
          this.channel = Object.create(found);
          this.scrollToBottom();
        }
      });
    } else {
      this.chn.fetch().subscribe();
    }
  }

  clear() {
    this.channel = new Channel();
  }

}
