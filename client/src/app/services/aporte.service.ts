import { Injectable } from "@angular/core";
import { URL_SERVER } from "./url";
import { HttpClient } from "@angular/common/http";
import { Aporte } from "../model/aporte";

@Injectable({
  providedIn: "root"
})
export class AporteService {
  private URL_API = URL_SERVER + "/aporte";

  constructor(private http: HttpClient) {}

  getAportes() {
    return this.http.get<Aporte[]>(this.URL_API);
  }

  addAporte(aporte: Aporte) {
    return this.http.post(this.URL_API, aporte);
  }

  updateAporte(_id: string, aporte: Aporte) {
    return this.http.put(this.URL_API + "/" + _id, aporte);
  }

  deleteAporte(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id);
  }
}
