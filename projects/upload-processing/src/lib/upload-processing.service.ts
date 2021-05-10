import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UploadProcessingService {

  redirectUrl: string;
  currentUser: string;
  response: string;

  constructor(public http:HttpClient) { }



  saveImage(data):Observable<any>{
 
    return this.http.post(`http://localhost:3000/api/v1/image-save`, data).pipe(
      catchError(this.errorMgmt)
    );
  }

  // setHeader(){
  //       this.header = new HttpHeaders({ 
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*, http://localhost:4200'
  //       });
  // }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log('error',error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    throw new Error("my error message"+errorMessage);
    console.log(error.message);
    return throwError(errorMessage);
  }
}

