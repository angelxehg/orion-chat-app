import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NewAuthService } from 'src/app/services/new-auth.service';
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

  constructor(private auth: NewAuthService, private settings: SettingsService) { }

  login = () => this.auth.loginWithEmail();

  register = () => this.auth.registerWithEmail();

  toggleTheme = () => this.settings.toggleTheme();

  get themeIcon() { return this.settings.isDarkTheme() ? 'moon' : 'sunny'; }

  get themeColor() { return this.settings.isDarkTheme() ? 'tertiary' : 'warning'; }

  ionViewDidEnter() {
    this.activeIndex();
  }

  slideChanged = (e: any) => this.activeIndex();

  activeIndex() {
    this.slides.getActiveIndex().then((index: number) => {
      this.currentSlide = index;
    });
  }

}