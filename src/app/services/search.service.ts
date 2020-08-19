import { Injectable } from '@angular/core';
import { OrganizationService } from './organization.service';
import { switchMap } from 'rxjs/operators';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private results: Array<SearchResult> = [
    {
      'type': 'Workspace',
      'content': "Workspace X"
    },
    {
      'type': 'Workspace',
      'content': "Workspace Y"
    },
    {
      'type': 'Workspace',
      'content': "Workspace Z"
    }
  ];

  constructor(
    private org: OrganizationService
  ) { }

  public find(query: string) {
    return this.org.selected.pipe(
      switchMap(async organization => {
        return this.results;
      })
    )
  }
}
