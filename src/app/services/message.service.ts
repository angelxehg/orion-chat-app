import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { map, switchMap } from 'rxjs/operators';
import { Message, MessageHistory } from '../models/message';
import { OrganizationService } from './organization.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private collection: Array<MessageHistory> = [];

  constructor(
    private http: HttpClient,
    private chn: ChannelService,
    private org: OrganizationService
  ) { }

  public find(channelID: number) {
    return this.chn.find(channelID).pipe(
      switchMap(async foundChannel => {
        if (!foundChannel) {
          return null;
        }
        return await this.fetch(foundChannel).toPromise();
      })
    );
  }

  private fetch(channel: Channel) {
    var foundHistory: MessageHistory = this.collection.find(e => e.id == channel.id);
    if (!foundHistory) {
      return this.forceFetch(channel);
    }
    if ((new Date().getTime() - foundHistory.lastFetch) > 1000) {
      return this.forceFetch(channel);
    }
    return new Observable<MessageHistory>(subscriber => {
      subscriber.next(foundHistory);
    });
  }

  private forceFetch(channel: Channel) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.get(`${environment.api_url}/organizations/${organization.id}/channels/${channel.id}/messages/`).pipe(
          switchMap(async (data: Array<Message>) => {
            var history: MessageHistory = this.collection.find(e => e.id == channel.id);
            if (history) {
              history.lastFetch = new Date().getTime();
              history.history = data;
            } else {
              history = {
                id: channel.id,
                channel: channel,
                lastFetch: new Date().getTime(),
                history: data
              }
              this.collection.push(history);
            }
            return history;
          })
        ).toPromise();
      })
    );
  }

  public send(message: Message, channel: Channel) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.post(`${environment.api_url}/organizations/${organization.id}/channels/${channel.id}/messages/`, message).pipe(
          switchMap(async (data: Message) => {
            var history: MessageHistory = this.collection.find(e => e.id == channel.id);
            history.history.push(data);
            return data;
          })
        ).toPromise();
      })
    );
  }

  private messageMockup() {
    var messages: Array<Message> = [];
    var limit = Math.floor(Math.random() * 100);
    for (let i = 1; i <= limit; i++) {
      var msg = {
        id: i,
        content: `Message #${i} with generated content. This is a message with generated content.`,
        mine_flag: Math.floor(Math.random() * 2) == 1
      }
      messages.push(msg);
    }
    return messages;
  }
}
