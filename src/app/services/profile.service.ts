import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { OrganizationService } from './organization.service';
import { switchMap } from 'rxjs/operators';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Profile = null;

  constructor(
    private storage: Storage,
    private org: OrganizationService
  ) { }

  public current: Observable<Profile> = this.org.selected.pipe(
    switchMap(async (selected) => {
      if (!selected) {
        return new Profile();
      }
      if (!this.profile) {
        var storedName = await this.storage.get("PROFILE_NAME")
        if (!storedName) {
          storedName = "";
        }
        this.profile = {
          'name': storedName
        };
      }
      return this.profile;
    })
  );

  public update(newProfile: Profile) {
    return this.current.pipe(
      switchMap(async () => {
        await this.storage.set("PROFILE_NAME", newProfile.name);
        this.profile = newProfile;
        return this.profile;
      })
    )

  }

}
