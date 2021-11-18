import { Injectable, NgZone } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationAdminService } from "./authentication-admin.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuardAdminService implements CanActivate {
    constructor(
        private ngZone: NgZone,
        private router: Router,
        private authenticationAdminService: AuthenticationAdminService
    ) { }

    canActivate() {
        const token = this.authenticationAdminService.getToken;
        if (token == null) {
            this.navigate("/admin/dang-nhap");
            return false;
        }
        return true;
    }

    public navigate(path: string): void {
        this.ngZone.run(() => this.router.navigateByUrl(path)).then();
    }
}
