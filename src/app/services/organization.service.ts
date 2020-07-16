import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Organization } from '../models/organization';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private selectedID: number = null;

  private collection = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController
  ) { }

  public selected: Observable<number> = this.fetch().pipe(
    switchMap(async (data) => {
      if (!this.selectedID) {
        var storedID = await this.storage.get("ORGANIZATION_ID")
        if (!storedID) {
          return null;
        }
        this.selectedID = storedID;
      }
      var selected = data.find(e => e.id == this.selectedID);
      if (!selected) {
        this.selectedID = null;
        this.router.navigateByUrl('/app/organization');
        return null;
      }
      return this.selectedID;
    })
  );

  public select(organizationID: number) {
    return this.fetch().pipe(
      switchMap(async (data) => {
        var organization = data.find(e => e.id == organizationID);
        if (!organization) {
          return null;
        }
        await this.storage.set("ORGANIZATION_ID", organization.id);
        this.selectedID = organization.id;
        return organization;
      })
    )
  }

  public fetch() {
    return this.http.get(`${environment.api_url}/organizations/`).pipe(
      switchMap(async (data: Array<Organization>) => {
        this.collection.next(data);
        return this.all();
      })
    );
  }

  public all(): Array<Organization> {
    return this.collection.getValue();
  }
}
