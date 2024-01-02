import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = "http://localhost:3000/articles"

  // constructor(private Http: HttpClient) { }
  Http = inject(HttpClient)


  getAll(): Observable<Article[]> {
    return this.Http.get<Article[]>(this.apiUrl)
  }

  getOne(id : number): Observable<Article> { 
    return this.Http.get<Article>(`${this.apiUrl}/${id}`)

  }

  persist(data : Article): Observable<Article> {
    return this.Http.post<Article>(this.apiUrl,data)

  }

  update(id:number, data: Article): Observable<Article> {
    return this.Http.put<Article>(`${this.apiUrl}/${id}`,data)

  }

  delete(id:number): Observable<Object> {
    return this.Http.delete<Object>(`${this.apiUrl}/${id}`)

  }




}
