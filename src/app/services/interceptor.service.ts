import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';


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
    var skip = false;
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
    return this.auth.status.pipe(
      switchMap(async ready => {
        if (ready) {
          const token = this.auth.getToken();
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${token}`
            }
          });
        }
        var handle = await next.handle(request).toPromise();
        return handle;
      })
    );
  }

}