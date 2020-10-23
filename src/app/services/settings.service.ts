import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Plugins, Capacitor, StatusBarStyle } from '@capacitor/core';

const { StatusBar, SplashScreen } = Plugins;

interface ThemeOptions {
  mode: string;
  silent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeMode = 'dark';

  constructor(private storage: Storage, private toast: ToastController) { }

  public loadTheme() {
    if (Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setOverlaysWebView({ overlay: false });
    }
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
    this.storage.get('THEME_MODE').then(mode => {
      if (!mode || mode === 'dark') {
        return this.setTheme({ mode: 'dark', silent: true });
      }
      return this.setTheme({ mode: 'light', silent: true });
    });
  }

  public setTheme(options: ThemeOptions) {
    const { mode, silent } = options;
    this.themeMode = mode;
    this.storage.set('THEME_MODE', mode).then();
    document.body.classList.toggle('dark', mode === 'dark');
    if (Capacitor.isPluginAvailable('StatusBar')) {
      const statusBarColor = mode === 'dark' ? '#000000' : '#ffffff';
      StatusBar.setBackgroundColor({ color: statusBarColor });
      if (mode === 'dark') {
        StatusBar.setStyle({ style: StatusBarStyle.Dark });
      } else {
        StatusBar.setStyle({ style: StatusBarStyle.Light });
      }
    }
    if (!silent) {
      this.toast.create({
        message: `Cambiando a tema <b>${mode}</b>`,
        duration: 1000
      }).then(toast => toast.present());
    }
  }

  public isDarkTheme = () => this.themeMode === 'dark';

  public toggleTheme() {
    if (this.isDarkTheme()) {
      return this.setTheme({ mode: 'light' });
    }
    return this.setTheme({ mode: 'dark' });
  }
}
