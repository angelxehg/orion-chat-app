import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Friend } from '../models/friend';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GatewayService } from './gateway.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  public friends: any;

  constructor(
    private http: HttpClient,
    private gateway: GatewayService) {
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
      .post<Friend>(this.gateway.api_path + "friends/", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single friend data by ID
  getItem(id): Observable<Friend> {
    return this.http
      .get<Friend>(this.gateway.api_path + "friends/" + id + '/')
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

  public async loadAllThen(event) {
    this.getList().subscribe(response => {
      console.log(response);
      this.friends = response;
      event.target.complete();
    })
  }

  // Get friends data
  getList(): Observable<Friend> {
    return this.http
      .get<Friend>(this.gateway.api_path + "friends/")
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item): Observable<Friend> {
    return this.http
      .put<Friend>(this.gateway.api_path + "friends/" + id + '/', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Friend>(this.gateway.api_path + "friends/" + id + '/', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
