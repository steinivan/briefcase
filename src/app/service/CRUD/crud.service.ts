import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { type,language } from 'src/app/model/models';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  public postId:any;
  private URL='http://localhost:8080/api'
  private listLanguage:language[]=[];
  private listType:type[]=[]
  constructor(private http:HttpClient) {
  }
  public getType(): Observable<type[]> {
    {
      return this.http.get<type[]>(`${this.URL}/type`)
    }
  }
  public getLanguage(): Observable<language[]> {
    return this.http.get<language[]>(`${this.URL}/language`)
  }
  public postLanguage(elem:language,name:string):Observable<language>{
    {
      return this.http.post<language>(`${this.URL}/language/create/` + name, elem )
    }
  }
  public deleteLanguage(id:language):Observable<language>{
    return this.http.delete<language>(`${this.URL}/language/delete/` + id.id)
  }
  // accountArray:type[]
  // public viewType(){
  //   return this.http.get(`${this.URL}/type`)
  // }
}