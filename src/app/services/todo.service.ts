import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getApiUrl(path:string){
    return `${this.apiUrl}${path}`.trim();
  }

  getTodos(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.getApiUrl('/todos'));
  }

  createTodo(body:ToDo): Observable<ToDo>{
    return this.http.post<ToDo>(this.getApiUrl('/todos'), body);
  }

  updateTodo(id:string, body:ToDo): Observable<ToDo>{
    return this.http.put<ToDo>(this.getApiUrl(`/todos/${id}`), body);
  }

  deleteTodo(id:string): Observable<ToDo>{
    return this.http.delete<ToDo>(this.getApiUrl(`/todos/${id}`));
  }

}
