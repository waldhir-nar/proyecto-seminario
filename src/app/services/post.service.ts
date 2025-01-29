import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer= 'http://51.79.26.171/';
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};
  constructor(
    private http: HttpClient
  ) {}
}
