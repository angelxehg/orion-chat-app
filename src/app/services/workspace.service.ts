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
      switchMap(async organization => {
        return await this.http.get(`${environment.api_url}/organizations/${organization.id}/workspaces/`).pipe(
          switchMap(async (data: Array<Workspace>) => {
            this.collection.next(data);
            this.lastFetch = new Date().getTime();
            return this.all();
          })
        ).toPromise();
      })
    );
  }

  public create(workspace: Workspace) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.post(`${environment.api_url}/organizations/${organization.id}/workspaces/`, workspace).pipe(
          switchMap(async (data: Workspace) => {
            await this.forceFetch().toPromise();
            return data;
          })
        ).toPromise();
      })
    );
  }

  public update(workspace: Workspace) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return await this.http.patch(`${environment.api_url}/organizations/${organization.id}/workspaces/${workspace.id}/`, workspace).pipe(
          switchMap(async (data: Workspace) => {
            await this.forceFetch().toPromise();
            return data;
          })
        ).toPromise();
      })
    );
  }

  public all(): Array<Workspace> {
    return this.collection.getValue();
  }
}
