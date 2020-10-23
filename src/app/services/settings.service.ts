import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Plugins, Capacitor, StatusBarStyle } from '@capacitor/core';

const { StatusBar, SplashScreen } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private darkMode = false;

  constructor(private storage: Storage, private toast: ToastController) { }

  public load() {
    if (Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setOverlaysWebView({ overlay: false });
    }
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
    this.storage.get('THEME_MODE').then(mode => {
      if (!mode || mode === 'light') {
        return this.setDark(false, true);
      }
      return this.setDark(true, true);
    });
  }

  private setDark(enableDark: boolean = true, silent: boolean = false) {
    this.darkMode = enableDark;
    this.storage.set('THEME_MODE', enableDark ? 'dark' : 'light').then();
    document.body.classList.toggle('dark', enableDark);
    if (Capacitor.isPluginAvailable('StatusBar')) {
      const statusBarColor = enableDark ? '#000000' : '#ffffff';
      StatusBar.setBackgroundColor({ color: statusBarColor });
      if (enableDark) {
        StatusBar.setStyle({ style: StatusBarStyle.Dark });
      } else {
        StatusBar.setStyle({ style: StatusBarStyle.Light });
      }
    }
    if (!silent) {
      this.toast.create({
        message: `Cambiando a tema <b>${this.modeStr()}</b>`,
        duration: 1000
      }).then(toast => toast.present());
    }
  }

  public toggle = () => this.darkMode ? this.setDark(false) : this.setDark();

  public icon = () => this.darkMode ? 'moon' : 'sunny';

  public color = () => this.darkMode ? 'tertiary' : 'warning';

  public modeStr = () => this.darkMode ? 'oscuro' : 'claro';

  public inverseModeStr = () => this.darkMode ? 'claro' : 'oscuro';
}
