import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { type,language,user,ImageModel } from 'src/app/model/models';
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
  private URL='https://backend-briefcase.herokuapp.com/api'
  // private URL='http://localhost:8080/api' 
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
  public editLanguage(elem:language):Observable<language>{
    return this.http.put<language>(`${this.URL}/language/edit/` + elem.id,elem)
  }
  public login(elem:user){
    const user = this.http.post<user>(`${this.URL}/auth/signin`,elem);
    return user.pipe(retry(1))
  }

  public updateImage(elem:any){
    return this.http.post<String>(`${this.URL}/image/upload`,elem);
  }
  public findImage(elem:String):Observable<ImageModel[]>{
    return this.http.get<ImageModel[]>(`${this.URL}/image/find`);
    // return this.http.get<any>(`${this.URL}/image/find/${elem}`);
  }
  public sendEmail(elem:any){
    return this.http.post<any>(`${this.URL}/email/send`,elem);
  }
}