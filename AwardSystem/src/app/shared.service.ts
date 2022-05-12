import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisation } from 'Models/Organisation';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly apiurl = "https://localhost:7275/api/";
  constructor(private http:HttpClient) { }

  addOrganisation(val:any){
    return this.http.post(this.apiurl+'Organisation/',val);
  }
  getAllOrganisation():Observable<any>{
    return this.http.get<Organisation>(this.apiurl + 'Organisation/GetAll')
  }
}
