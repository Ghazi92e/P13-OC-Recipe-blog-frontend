import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "../_services/users.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    authReq: any

  constructor(private auth: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the user auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

        this.authReq = req.clone({
            headers: req.headers.set('Authorization', authToken ? 'Token ' + authToken: '')
        });

    return next.handle(this.authReq);
  }
}