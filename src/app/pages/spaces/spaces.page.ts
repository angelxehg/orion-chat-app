import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeSpaceGroup } from 'src/app/models/space';
import { PanelService } from 'src/app/services/panel.service';
import { SpacesService } from 'src/app/services/spaces.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.page.html',
  styleUrls: ['./spaces.page.scss'],
})
export class SpacesPage {

  items: Observable<TomatoeSpaceGroup[]> = this.spaces.observable;

  constructor(private spaces: SpacesService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('spaces');
    this.spaces.mock();
  }
}
