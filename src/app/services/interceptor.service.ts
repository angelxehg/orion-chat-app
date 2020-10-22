import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  skip: Array<string>;

  constructor(private auth: AuthService) {
    this.skip = [
      '/auth/jwt',
      '/auth/users',
    ];
  }

  skipRequest(request: HttpRequest<any>) {
    let skip = false;
    this.skip.forEach(url => {
      if (request.url.includes(url)) {
        return skip = true;
      }
    });
    return skip;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (this.skipRequest(request)) {
      return next.handle(request);
    }
    return this.auth.token.pipe(
      switchMap(async token => {
        if (!token) {
          console.error('No token! canceling request!');
          return EMPTY.toPromise();
        }
        request = req.clone({
          setHeaders: { authorization: `Bearer ${token}` }
        });
        const handle = await next.handle(request).toPromise();
        return handle;
      })
    );
  }
}
