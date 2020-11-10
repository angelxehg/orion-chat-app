import { Component } from '@angular/core';
import { SpacesService } from 'src/app/services/spaces.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.page.html',
  styleUrls: ['./spaces.page.scss'],
})
export class SpacesPage {

  items = this.spaces.items$;

  constructor(private spaces: SpacesService) { }

  enabled = () => this.spaces.enabled();

  ionViewWillEnter() {
    this.spaces.subscribe();
  }

  ionViewWillLeave() {
    this.spaces.unsubscribe();
  }
}
