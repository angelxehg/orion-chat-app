import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeEventGroup } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {

  items: Observable<TomatoeEventGroup[]> = this.events.observable;

  constructor(private events: EventsService) { }

  ionViewWillEnter() {
    this.events.mock();
  }

}
