import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, tap, take, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Organization } from '../models/organization';
import { AuthService } from './auth.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationData = new BehaviorSubject(null);
  private selectedID: number = null;

  public organizations: Observable<any>;
  private collection = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    public toastController: ToastController
  ) {
  }

  public selected: Observable<number> = this.fetch().pipe(
    switchMap(async () => {
      if (!this.selectedID) {
        var storedID = await this.storage.get("ORGANIZATION_ID")
        if (!storedID) {
          return null;
        }
        this.selectedID = storedID;
      }
      return this.selectedID;
    })
  );

  current = {
    get: (): number => {
      return this.organizationData.getValue();
    },
    set: (organization: Organization): Observable<any> => {
      this.organizationData.next(organization.id);
      let storageObs = from(this.storage.set("ORGANIZATION_ID", organization.id));
      this.selectedID = organization.id;
      return storageObs;
    }
  }

  fetch() {
    return this.http.get(`${environment.api_url}/organizations/`).pipe(
      switchMap(async (data: Array<Organization>) => {
        this.collection.next(data);
        return this.all();
      })
    );
  }

  all(): Array<Organization> {
    return this.collection.getValue();
  }
}
