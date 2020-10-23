import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate,
    private settings: SettingsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.settings.load();
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          if (confirm('Hay una nueva versión disponible. ¿Cargar nueva versión?')) {
            window.location.reload();
          }
        });
      }
    });
  }
}
