import { Injectable } from '@angular/core';
import { Awards } from 'Models/Awards';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(private httpclient: HttpClient) { }

 
}
