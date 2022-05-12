// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedService {
//   readonly apiurl = "https://localhost:7275/api/";
//   constructor(private http:HttpClient) { }

//   addOrganisation(val:any){
//     return this.http.post(this.apiurl+'Organisation/',val);
//   }
// }

 import { HttpClient } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { map } from 'rxjs/operators';
 @Injectable()
 export class SharedService {
   dataarray=[];
   constructor(private http:HttpClient) {
    }
     getOne(id:any){
      this.http.get('https://dummy.restapiexample.com/api/v1/employee/1'+id).pipe(map(data => {})).subscribe(result => {
        console.log(result);
      });
     }
 }
