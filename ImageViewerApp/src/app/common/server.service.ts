import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private baseUrl = 'https://localhost:0000/api/';

  constructor(private http: HttpClient) { }

  /** GET images from the server */
  getImages(): Observable<any[]> {
    // var url: string = this.baseUrl + '/images';
    // return this.http.get<any[]>(this.baseUrl)
    //   .pipe(
    //     catchError(this.handleError('getImages', []))
    //   );
    const images = [
      { Id: 1, Path: '../../assets/images/test-image.png', Tags:[]},
      { Id: 2, Path: '../../assets/images/test-image2.jpg', Tags:[] },
      { Id: 3, Path: '../../assets/images/test-image.png', Tags:[] },
      { Id: 4, Path: '../../assets/images/test-image2.jpg', Tags:[] },
      { Id: 5, Path: '../../assets/images/test-image.png', Tags:[] },
      { Id: 6, Path: '../../assets/images/test-image2.jpg', Tags:[] },
      { Id: 7, Path: '../../assets/images/test-image.png', Tags:[] },
      { Id: 8, Path: '../../assets/images/test-image2.jpg', Tags:[] },
      { Id: 9, Path: '../../assets/images/test-image.png', Tags:[] },
      { Id: 10, Path: '../../assets/images/test-image2.jpg', Tags:[] }
    ];
    return of(images);
  }

  updateImage(id: number, json: string): Observable<any> {
    // var url: string = this.baseUrl + '/' + id + '/';
    // return this.http.put<any>(url, json, httpOptions)
    //   .pipe(
    //     catchError(this.handleError('updateImage', []))
    //   );
    return of({});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
