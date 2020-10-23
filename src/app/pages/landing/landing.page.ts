import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  @ViewChild('slides', { static: true }) slides: IonSlides;

  currentSlide = 0;

  slideOpts = {
    speed: 400
  };

  constructor(private router: Router, private settings: SettingsService) { }

  toggleTheme = () => this.settings.toggle();

  themeIcon = () => this.settings.icon();

  themeColor = () => this.settings.color();

  ionViewDidEnter() {
    this.activeIndex();
  }

  slideChanged = (e: any) => this.activeIndex();

  activeIndex() {
    this.slides.getActiveIndex().then((index: number) => {
      this.currentSlide = index;
    });
  }

  login() {
    this.router.navigateByUrl('/app', { skipLocationChange: true });
  }

  register() {
    this.router.navigateByUrl('/app', { skipLocationChange: true });
  }

}
