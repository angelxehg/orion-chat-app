import { Component } from '@angular/core';
import { PanelService } from '../../../services/panel.service';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../../models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { PageData } from '../../../models/page-data';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.page.html',
  styleUrls: ['./organization-details.page.scss'],
})
export class OrganizationDetailsPage {

  public organization: Organization;

  public page: PageData;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private org: OrganizationService,
    public panel: PanelService,
  ) {
    this.clear();
    this.createMode();
  }

  ionViewWillEnter() {
    // Panel
    this.panel.show();
    // Configure mode
    this.clear();
    var param = this.route.snapshot.paramMap.get('organization');
    if (!param) {
      // New mode
      this.createMode();
    } else {
      // Edit mode
      this.editMode();
      var thisID = parseInt(param);
      this.org.organizations.subscribe({
        next: (data: Array<Organization>) => {

          var selected = data.find(e => e.id == thisID);
          this.organization = Object.create(selected);
        }
      });
    }
  }

  createMode() {
    this.page = {
      title: "Create organization",
      description: "Create a new organization",
      action: "Create"
    };
  }

  editMode() {
    this.page = {
      title: "Edit organization",
      description: "Update organization data",
      action: "Update"
    };
  }

  clear() {
    this.organization = {
      id: 0,
      title: "",
      description: "",
      admin_flag: false,
      people: []
    }
  }
}
