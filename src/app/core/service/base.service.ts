import { HttpClient } from "@angular/common/http";

export class BaseService {
  constructor(public http: HttpClient, public routerPrefix: string) { }

  get(filter: {}) {
    return this.http.get(this.routerPrefix, { params: filter });
  }

  getById(key: any) {
    return this.http.get(this.routerPrefix + "/" + key);
  }

  post(entity: any) {
    return this.http.post(this.routerPrefix, entity);
  }

  put(key: any, entity: any) {
    return this.http.put(this.routerPrefix + "/" + key, entity);
  }

  deleteById(key: any) {
    return this.http.delete(this.routerPrefix + "/" + key);
  }
}
