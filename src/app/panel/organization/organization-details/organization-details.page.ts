import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../../panel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.page.html',
  styleUrls: ['./organization-details.page.scss'],
})
export class OrganizationDetailsPage {

  public page: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public panel: PanelService,
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
    this.page = this.route.snapshot.paramMap.get('organization');
  }

}
