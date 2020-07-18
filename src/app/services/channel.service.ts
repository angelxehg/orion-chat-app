import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from './organization.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  public all(): Array<Channel> {
    return this.collection.getValue();
  }
}
