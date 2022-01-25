import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentification/auth.service';

// liste des chemins sont header
export const apiWithoutHeader = [
  "http://localhost:8000/api/v1/magasin",
  "http://localhost:8000/api/v1/users/login",
  "http://localhost:8000/api/v1/users/register"
];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token =this.auth.token;

    if (this.apiWithNoHeaders(request)) {
      return next.handle(request);
    }
    const newRequest =request.clone({
          headers:request.headers.set('Authorization',token)
    })
    return next.handle(newRequest);
  }

  apiWithNoHeaders(request: HttpRequest<unknown>): boolean {
    return apiWithoutHeader.includes(request.url);
  }


}
