import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.scss'],
})
export class BigButtonComponent {

  @Input() title = '';

  @Input() color = 'default';

  constructor() { }

}
