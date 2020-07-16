import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Organization } from '../models/organization';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organization: Organization = null;

  private collection = new BehaviorSubject(null);

  private lastFetch: number;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController
  ) {
    this.selected.subscribe();
  }

  public selected: Observable<Organization> = this.fetch().pipe(
    switchMap(async (data) => {
      if (!this.organization) {
        var storedID = await this.storage.get("ORGANIZATION_ID")
        if (!storedID) {
          return this.organization = null;
        }
        return this.organization = await this.select(storedID).toPromise();
      }
      this.organization = data.find(e => e.id == this.organization.id);
      if (!this.organization) {
        this.router.navigateByUrl('/app/organization');
        this.organization = null;
      }
      return this.organization;
    })
  );

  public current() {
    return this.organization;
  }

  public select(organizationID: number) {
    return this.find(organizationID).pipe(
      switchMap(async (organization) => {
        if (!organization) {
          return null;
        }
        await this.storage.set("ORGANIZATION_ID", organization.id);
        this.organization = organization;
        return organization;
      })
    );
  }

  public find(organizationID: number) {
    return this.fetch().pipe(
      map(data => {
        var organization = data.find(e => e.id == organizationID);
        if (!organization) {
          return null;
        }
        return organization;
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
    return new Observable<Organization[]>(subscriber => {
      subscriber.next(this.collection.getValue());
    });
  }

  private forceFetch() {
    return this.http.get(`${environment.api_url}/organizations/`).pipe(
      switchMap(async (data: Array<Organization>) => {
        this.collection.next(data);
        this.lastFetch = new Date().getTime();
        return this.all();
      })
    );
  }

  public update(organization: Organization) {
    var id = organization.id;
    return this.http.patch(`${environment.api_url}/organizations/${id}/`, organization).pipe(
      switchMap(async (data: Organization) => {
        await this.forceFetch().toPromise();
        await this.selected.toPromise();
        return data;
      })
    );
  }

  public all(): Array<Organization> {
    return this.collection.getValue();
  }
}
