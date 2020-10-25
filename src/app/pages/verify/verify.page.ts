import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {

  mode = 'none';

  ready = false;

  error = false;

  success = false;

  slideOpts = {
    speed: 400
  };

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ionViewWillEnter() {
    const params = this.route.snapshot.queryParams;
    if (params.mode === 'verifyEmail') {
      return this.verifyEmail(params.oobCode);
    }
    this.ready = true;
  }

  verifyEmail(oobCode: string) {
    this.mode = 'verifyEmail';
    if (!oobCode) {
      return this.ready = true;
    }
    return this.auth.verifyEmail(oobCode).then(ok => {
      this.ready = true;
      this.success = ok;
      this.error = !ok;
    });
  }

  title() {
    switch (this.mode) {
      case 'verifyEmail':
        return 'Verificación Email';
      default:
        return 'Verificación Email';
    }
  }

  content() {
    switch (this.mode) {
      case 'verifyEmail':
        if (this.error) {
          return 'Error en la verificación';
        }
        return this.success ? 'Verificación correcta' : 'Verificando email';
      default:
        return 'Se ha enviado un correo de verificación';
    }
  }

}
