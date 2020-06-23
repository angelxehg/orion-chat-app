import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Friend } from '../models/friend';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private api_path = "http://192.168.0.62:8000/api/v1/";
  private path = this.api_path + "friends/";

  public friends: any;

  constructor(private http: HttpClient) {
    this.friends = [];
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item): Observable<Friend> {
    return this.http
      .post<Friend>(this.path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single friend data by ID
  getItem(id): Observable<Friend> {
    return this.http
      .get<Friend>(this.path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  public async loadAll() {
    this.getList().subscribe(response => {
      console.log(response);
      this.friends = response;
    })
  }

  public async loadAllThen(action) {
    this.getList().subscribe(response => {
      console.log(response);
      this.friends = response;
      action();
    })
  }

  // Get friends data
  getList(): Observable<Friend> {
    return this.http
      .get<Friend>(this.path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item): Observable<Friend> {
    return this.http
      .put<Friend>(this.path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Friend>(this.path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
