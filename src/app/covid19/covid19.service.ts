import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(public http: HttpClient) { }

  public cp = "https://api.covid19api.com"

  casosPaisesCovid19(){
    let covid19 = `${this.cp}/summary`;
    return this.http.get(covid19)
  }

}
