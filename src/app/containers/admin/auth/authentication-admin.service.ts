import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { User } from 'src/app/core/model/user';
import { Constants } from 'src/app/core/util/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationAdminService {

    constructor(private http: HttpClient) { }

    get getToken(): string | null {
        return localStorage.getItem(Constants.LOCAL_STORAGE_KEY.TOKEN_ADMIN);
    }

    get currentUserValue(): User | null {
        let session = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION_ADMIN);
        if (session == null) return null;
        return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION_ADMIN)?.toString() ?? "");
    }

    login(user: User) {
        return this.http.post(AppRoutingApi.Auth.LoginAdmin, user)
            .pipe(
                map((resp: any) => {
                    localStorage.setItem(Constants.LOCAL_STORAGE_KEY.SESSION_ADMIN, resp["data"]);
                    localStorage.setItem(Constants.LOCAL_STORAGE_KEY.TOKEN_ADMIN, JSON.parse(resp["data"])["Token"]);
                    return resp;
                })
            );
    }
}
