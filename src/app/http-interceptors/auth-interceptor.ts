import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "../_services/users.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    authReq: any

  constructor(private auth: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (req.url == 'http://127.0.0.1:8000/api-token-auth/') {
        this.authReq = req.clone({
            headers: req.headers.set('Authorization', '')
        });
    } else {
        this.authReq = req.clone({
            headers: req.headers.set('Authorization', 'Token ' + authToken)
        });
    }
    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}