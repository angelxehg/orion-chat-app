import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TomatoeItem } from 'src/app/models/item';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dev-cars',
  templateUrl: './dev-cars.page.html',
  styleUrls: ['./dev-cars.page.scss'],
})
export class DevCarsPage {

  items: TomatoeItem[];

  subscription: Subscription;

  constructor(private cars: CarService) { }

  ionViewWillEnter() {
    this.subscription = this.cars.index().subscribe(items => this.items = items);
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  enabled = () => this.cars.enabled();

}
