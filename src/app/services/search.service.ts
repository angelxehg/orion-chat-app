import { Injectable } from '@angular/core';
import { OrganizationService } from './organization.service';
import { switchMap } from 'rxjs/operators';
import { SearchResult } from '../models/search-result';
import { WorkspaceService } from './workspace.service';
import { ChannelService } from './channel.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private results: Array<SearchResult>;

  constructor(
    private org: OrganizationService,
    private wks: WorkspaceService,
    private chn: ChannelService
  ) { }

  public find(query: string) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        this.results = [];
        this.results = this.results.concat(await this.findOrganizations(query).toPromise());
        this.results = this.results.concat(await this.findWorkspaces(query).toPromise());
        this.results = this.results.concat(await this.findChannels(query).toPromise());
        return this.results;
      })
    );
  }

  private findOrganizations(query: string) {
    return this.org.fetch().pipe(
      switchMap(async organizations => {
        const results: Array<SearchResult> = [];
        organizations.filter((element) => {
          return element.title.includes(query) || element.description.includes(query);
        }).forEach(element => {
          results.push({
            type: 'Organization',
            content: `${element.title}: ${element.description.slice(0, 100)}`
          });
        });
        return results;
      })
    );
  }

  private findWorkspaces(query: string) {
    return this.wks.fetch().pipe(
      switchMap(async workspaces => {
        const results: Array<SearchResult> = [];
        workspaces.filter((element) => {
          return element.title.includes(query) || element.description.includes(query);
        }).forEach(element => {
          results.push({
            type: 'Workspace',
            content: `${element.title}: ${element.description.slice(0, 100)}`
          });
        });
        return results;
      })
    );
  }

  private findChannels(query: string) {
    return this.chn.fetch().pipe(
      switchMap(async channels => {
        const results: Array<SearchResult> = [];
        channels.filter((element) => {
          return element.title.includes(query) || element.description.includes(query);
        }).forEach(element => {
          results.push({
            type: 'Channel',
            content: `${element.title}: ${element.description.slice(0, 100)}`
          });
        });
        return results;
      })
    );
  }
}
