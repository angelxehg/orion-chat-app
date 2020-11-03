import { Component } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-hybrid-layout',
  templateUrl: './hybrid-layout.component.html',
  styleUrls: ['./hybrid-layout.component.scss'],
})
export class HybridLayoutComponent {

  constructor(public panel: PanelService) { }

}
