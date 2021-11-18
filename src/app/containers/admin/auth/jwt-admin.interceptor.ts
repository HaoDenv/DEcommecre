import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationAdminService } from "./authentication-admin.service";

@Injectable()
export class JwtAdminInterceptor implements HttpInterceptor {
    constructor(private authenticationAdminService: AuthenticationAdminService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token = this.authenticationAdminService.getToken;
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
