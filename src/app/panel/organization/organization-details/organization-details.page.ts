import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../../panel.service';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/services/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.page.html',
  styleUrls: ['./organization-details.page.scss'],
})
export class OrganizationDetailsPage {

  public organization: Organization = {
    id: 0,
    title: "",
    description: "",
    admin_flag: false,
    people: []
  }

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private org: OrganizationService,
    public panel: PanelService,
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
    this.org.organizations.subscribe({
      next: (data: Array<Organization>) => {
        var thisID = parseInt(this.route.snapshot.paramMap.get('organization'));
        var selected = data.find(e => e.id == thisID);
        this.organization = Object.create(selected);
      }
    });
  }

}
