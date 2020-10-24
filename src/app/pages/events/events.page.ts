import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeEventGroup } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {

  items: Observable<TomatoeEventGroup[]> = this.events.observable;

  constructor(private events: EventsService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show();
    this.events.mock();
  }

}
