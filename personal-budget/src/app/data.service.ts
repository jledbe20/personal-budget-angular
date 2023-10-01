import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget';
  private cachedData: any = null;

  constructor(private http: HttpClient) { }

  fetchBudget(): Observable<any> {
    // if there's data already in the cache
    // then it won't make the call, and
    // sends the cached data instead.
    if (this.cachedData) {
      console.log("from the cache: ", this.cachedData)
      return of(this.cachedData);
    }

    return this.http.get<any>(this.apiUrl).pipe(
      // saves the retrieved data into a cache.
      tap(data => {
        this.cachedData = data;
        console.log("to the cache: ", this.cachedData)
      })
    );
  }
}
