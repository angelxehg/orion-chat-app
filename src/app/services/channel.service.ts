import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from './organization.service';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private collection = new BehaviorSubject(null);

  private lastFetch: number;

  constructor(
    private http: HttpClient,
    private org: OrganizationService
  ) { }

  public find(channelID: number) {
    return this.fetch().pipe(
      map(data => data.find(e => e.id == channelID))
    );
  }

  public fetch() {
    if (!this.lastFetch) {
      return this.forceFetch();
    }
    if ((new Date().getTime() - this.lastFetch) > 5000) {
      return this.forceFetch();
    }
    return this.cacheFetch();
  }

  private cacheFetch() {
    return new Observable<Channel[]>(subscriber => {
      subscriber.next(this.collection.getValue());
    });
  }

  private forceFetch() {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.get(`${environment.api_url}/organizations/${organization.id}/channels/`).pipe(
          switchMap(async (data: Array<Channel>) => {
            this.collection.next(data);
            this.lastFetch = new Date().getTime();
            return this.all();
          })
        ).toPromise();
      })
    );
  }

  public create(channel: Channel) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.post(`${environment.api_url}/organizations/${organization.id}/channels/`, channel).pipe(
          switchMap(async (data: Channel) => {
            await this.forceFetch().toPromise();
            return data;
          })
        ).toPromise();
      })
    );
  }

  public update(channel: Channel) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.patch(`${environment.api_url}/organizations/${organization.id}/channels/${channel.id}/`, channel).pipe(
          switchMap(async (data: Channel) => {
            await this.forceFetch().toPromise();
            return data;
          })
        ).toPromise();
      })
    );
  }

  public remove(channel: Channel) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.delete(`${environment.api_url}/organizations/${organization.id}/channels/${channel.id}/`).pipe(
          switchMap(async () => {
            await this.forceFetch().toPromise();
            return true;
          })
        ).toPromise();
      })
    );
  }

  public all(): Array<Channel> {
    return this.collection.getValue();
  }
}
