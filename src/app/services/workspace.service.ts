import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from './organization.service';
import { environment } from 'src/environments/environment';
import { switchMap, map } from 'rxjs/operators';
import { Workspace } from '../models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private collection = new BehaviorSubject(null);

  private lastFetch: number;

  constructor(
    private http: HttpClient,
    private org: OrganizationService
  ) { }

  public find(workspaceID: number) {
    return this.fetch().pipe(
      map(data => {
        var workspace = data.find(e => e.id == workspaceID);
        if (!workspace) {
          return null;
        }
        return workspace;
      })
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
    return new Observable<Workspace[]>(subscriber => {
      subscriber.next(this.collection.getValue());
    });
  }

  private forceFetch() {
    return this.org.selected.pipe(
      switchMap(async found => {
        return await this.http.get(`${environment.api_url}/organizations/${found.id}/workspaces/`).pipe(
          switchMap(async (data: Array<Workspace>) => {
            this.collection.next(data);
            this.lastFetch = new Date().getTime();
            return this.all();
          })
        ).toPromise();
      })
    );
  }

  public all(): Array<Workspace> {
    return this.collection.getValue();
  }
}
