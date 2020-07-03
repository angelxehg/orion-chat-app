import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public hidden: boolean

  public secondary: boolean

  constructor() {
    this.hidden = false;
    this.secondary = false;
  }

  show() {
    console.log("Showing panel");
    this.hidden = false;
  }

  hide() {
    console.log("Hiding panel");
    this.hidden = true;
  }

  secondaryShow() {
    this.secondary = true;
  }

  secondaryHide() {
    this.secondary = false;
  }
}
