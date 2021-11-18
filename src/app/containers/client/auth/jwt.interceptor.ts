import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token = this.authenticationService.getToken;
        let header: any = {};
        if (token != null) {
            header["Authorization"] = `Bearer ${token}`;
        }
        request = request.clone({
            setHeaders: header,
        });
        return next.handle(request);
    }
}
