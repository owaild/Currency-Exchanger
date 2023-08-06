import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CurrencyExchangerService {
  constructor(public http: HttpClient) { }

  // set endpoint and your API key
  endpoint = "convert";

  currencySymbols(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      if (key && data[key] != undefined && data[key] != '') {
        httpParams = httpParams.append(key, data[key]);
      }
    });
    return this.http.get(
      environment.baseURL + "symbols?" + httpParams
    );
  }
  currencyRate(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      if (key && data[key] != undefined && data[key] != '') {
        httpParams = httpParams.append(key, data[key]);
      }
    });
    return this.http.get(environment.baseURL + "latest?" + httpParams);
  }
}
