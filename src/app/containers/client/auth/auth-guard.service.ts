import { Injectable, NgZone } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuardService implements CanActivate {
    constructor(
        private ngZone: NgZone,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate() {
        const token = this.authenticationService.getToken;
        if (token == null) {
            this.navigate("/dang-nhap");
            return false;
        }
        return true;
    }

    public navigate(path: string): void {
        this.ngZone.run(() => this.router.navigateByUrl(path)).then();
    }
}
