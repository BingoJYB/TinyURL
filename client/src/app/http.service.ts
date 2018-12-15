import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch'
import {URL} from './url';

@Injectable()
export class HttpService {
    baseURL = 'http://localhost:3000/tinyurl/api/v1';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    getURL(urlCode): Observable<any> {
        return this.http.get(`${this.baseURL}/get_tinyurl/${urlCode}`, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }

    addTinyURL(url): Observable<any> {
        return this.http.post(`${this.baseURL}/create_tinyurl`, url, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }
}
