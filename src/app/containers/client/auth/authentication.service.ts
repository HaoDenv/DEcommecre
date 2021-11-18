import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { User } from 'src/app/core/model/user';
import { Constants } from 'src/app/core/util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  get getToken(): string | null {
    return localStorage.getItem(Constants.LOCAL_STORAGE_KEY.TOKEN);
  }

  get currentUserValue(): User | any | null {
    let session = localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION);
    if (session == null) return null;
    return JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_KEY.SESSION)?.toString() ?? "");
  }

  login(user: User) {
    return this.http.post(AppRoutingApi.Auth.Login, user)
      .pipe(
        map((resp: any) => {
          localStorage.setItem(Constants.LOCAL_STORAGE_KEY.SESSION, resp["data"]);
          localStorage.setItem(Constants.LOCAL_STORAGE_KEY.TOKEN, JSON.parse(resp["data"])["Token"]);
          return resp;
        })
      );
  }
}
