import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";

import { Ads } from "../model/ads";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdsService {
  private URL_API = URL_SERVER + "/ads";

  constructor(private http: HttpClient) {}

  getAds() {
    return this.http.get<Ads[]>(this.URL_API);
  }

  addAds(ads: Ads) {
    return this.http.post(this.URL_API, ads);
  }

  updateAds(_id: string, ads: Ads) {
    return this.http.put(this.URL_API + "/" + _id, ads);
  }

  deleteAds(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
