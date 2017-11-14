import ToDo from '../models/todo.model';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoService{
    apiUrl = 'http://localhost:3000/api';
    todoUrl = `${this.apiUrl}/todos`;

    constructor(
        private http : HttpClient
    ){}

    createTodo(todo: ToDo): Observable<any>{
        return this.http.post(`${this.todoUrl}`, todo);
    }

    getToDos(): Observable<ToDo[]>{
        return this.http.get(`${this.todoUrl}`)
            .map(res => {
                return res['data'] as ToDo[];
            });
    }

    editTodo(todo: ToDo){
        return this.http.put(`${this.todoUrl}`, todo);
    }

    deleteToDo(id: string): any{
        return this.http.delete(`${this.todoUrl}/${id}`)
            .map(res => {
                return res;
            });
    }
}