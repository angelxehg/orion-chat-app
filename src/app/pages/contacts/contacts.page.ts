import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeContactGroup } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage {

  items: Observable<TomatoeContactGroup[]> = this.contacts.observable;

  constructor(private contacts: ContactsService) { }

  ionViewWillEnter() {
    this.contacts.mock();
  }

}
