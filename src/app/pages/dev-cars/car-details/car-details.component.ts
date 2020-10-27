import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TomatoeItem } from 'src/app/models/item';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent {

  mode = 'new';
  item: TomatoeItem;
  id = '';

  constructor(private route: ActivatedRoute, private cars: CarService) {
    const params = this.route.snapshot.params;
    if (params.car) {
      this.mode = 'edit';
      this.id = params.car;
      this.cars.document(this.id).subscribe(item => {
        this.item = item;
      });
    } else {
      this.item = {};
    }
  }

  title = () => this.mode === 'new' ? 'Nuevo auto' : 'Modificar auto';

  save() {
    if (this.mode === 'edit') {
      this.cars.update(this.id, this.item).then();
    } else if (this.mode === 'new') {
      this.cars.create(this.item).then();
    }
  }

}
