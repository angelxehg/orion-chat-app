import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  @ViewChild('slides', { static: true }) slides: IonSlides;

  currentSlide = 0;

  slideOpts = {
    speed: 400
  };

  constructor(private router: Router, private theme: ThemeService) { }

  toggleTheme = () => this.theme.toggle();

  themeIcon = () => this.theme.icon();

  themeColor = () => this.theme.color();

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
