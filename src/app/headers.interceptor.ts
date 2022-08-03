import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('openid-configuration')) {
      return next.handle(request);
    }


    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${sessionStorage.getItem('auth-token')}`),
    });

    return next.handle(modifiedReq);
  }
}
