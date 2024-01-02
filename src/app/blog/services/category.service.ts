import { Injectable, inject } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "http://localhost:3000/categories"
  
  // constructor(private Http: HttpClient) { }
  Http = inject(HttpClient)

  getAll(): Observable<Category[]> {
    return this.Http.get<Category[]>(this.url)
  }

  getOne(id : number): Observable<Category> {  
    return this.Http.get<Category>(`${this.url}/${id}`)

  }

  persist(data : Category): Observable<Category> {
    return this.Http.post<Category>(this.url, data)

  }

  update(id:number, data: Category): Observable<Category> {
    return this.Http.put<Category>(`${this.url}/${id}`, data)

  }

  delete(id:number): Observable<Category> {
    return this.Http.delete<Category>(`${this.url}/${id}`)

  }
}
