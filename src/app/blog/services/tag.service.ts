import { Injectable, inject } from '@angular/core';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = "http://localhost:3000/tags"

  // constructor(private Http: HttpClient) { }
  Http = inject(HttpClient)
  getAll(): Observable<Tag[]> {
    return this.Http.get<Tag[]>(this.url)

  }

  getOne(id : number): Observable<Tag> { 
    return this.Http.get<Tag>(`${this.url}/${id}`) 

  }

  persist(data : Tag): Observable<Tag> {
    return this.Http.post<Tag>(this.url, data)

  }

  update(id:number, data: Tag): Observable<Tag> {
    return this.Http.put<Tag>(`${this.url}/${id}`, data)

  }

  delete(id:number): Observable<Object> {
    return this.Http.delete<Object>(`${this.url}/${id}`)

  }
}
