import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewAuthService {

  private loggedIn = true;

  constructor(private router: Router) { }

  public isLoggedIn = () => this.loggedIn;

  public loginWithEmail() {
    this.loggedIn = true;
    this.router.navigateByUrl('/');
    return true;
  }

  public registerWithEmail() {
    this.loggedIn = true;
    this.router.navigateByUrl('/');
    return true;
  }

  public logout() {
    this.loggedIn = false;
    this.router.navigateByUrl('/landing');
    return true;
  }
}
