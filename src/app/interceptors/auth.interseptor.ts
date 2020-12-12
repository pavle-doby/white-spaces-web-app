import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import HttpStatusCode from 'src/models/HttpStatusCode';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { LoginParam } from '../app.config';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = LocalStorageService.Instance.AuthToken;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => event,
        (error) => {
          if (error.status === HttpStatusCode.UNAUTHORIZED) {
            LocalStorageService.Instance.clearAuthToken();
            const logInRoute = this.router.url.includes(MainRouterPaths.ADMIN)
              ? MainRouterPaths.ADMIN
              : `/${MainRouterPaths.LOGIN}?login=${LoginParam.LOGIN}`;

            this.router.navigateByUrl(logInRoute);
          }
        }
      )
    );
  }
}
