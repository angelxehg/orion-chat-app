import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  api_path: string;

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.api_path = this.gateway.api_path;
  }

  defaultPath() {
    this.api_path = "http://192.168.0.62:8000/api/v1/";
    this.savePath();
  }

  savePath() {
    this.gateway.api_path = this.api_path;
  }

}
