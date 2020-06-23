import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  public api_path = "";
  public paths = []

  constructor() {
    this.paths = [
      "http://192.168.0.62:8000/api/v1/"
    ];
    this.api_path = this.paths[0];
  }

}
