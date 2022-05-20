import { Injectable } from '@angular/core';
import { Awards } from 'Models/Awards';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(private httpclient: HttpClient) { }

  approve(id:number,data:any): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.httpclient.put('https://localhost:7275/api/Award/Approve?id=${id}',data,{headers});
  }
}
