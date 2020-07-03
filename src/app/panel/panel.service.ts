import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public hidden: boolean;

  constructor() {
    this.hidden = false;
  }

  show() {
    console.log("Showing panel");
    this.hidden = false;
  }

  hide() {
    console.log("Hiding panel");
    this.hidden = true;
  }
}
