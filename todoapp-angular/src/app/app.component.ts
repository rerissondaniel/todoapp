import { Component, OnInit } from '@angular/core';
import { TodoService } from "./services/todo.service";
import ToDo from './models/todo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private todoService: TodoService
  ){}
  
  public newTodo: ToDo = new ToDo();

  todoList : ToDo[];
  editTodos : ToDo[] = [];

  create(newTodo: ToDo) {
    this.todoService.createTodo(newTodo)
      .subscribe((res) => {
        this.todoList.push(newTodo);
        this.newTodo = new ToDo();
      });
  }

  editTodo(todo: ToDo) {
    if(this.todoList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo);
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo)
          .subscribe((res) => {
            console.log("Updated successfull");
          }, (err) => {
            this.editTodo(todo);
            console.log(err);
          });
      }
    }
  }

  deleteTodo(todo : ToDo) {
    this.todoService.deleteToDo(todo._id)
      .subscribe((res) => {
        this.todoList.splice(this.todoList.indexOf(todo), 1);
        console.log("Todo deleted successfully");
      });
  }

  doneTodo(todo : ToDo){
    todo.status = "Done";
    this.todoService.editTodo(todo)
      .subscribe((res) => {
        console.log("Todo status update successfull");
      }, (err) => {
        this.editTodo(todo);
        console.log(err);
      });
  }

  submitTodo(event, todo : ToDo) {
    if(event.keyCode == 13){
      this.editTodo(todo);
    }
  }

  ngOnInit() : void{
    this.todoService.getToDos()
      .subscribe(todos => {
        this.todoList = todos;
      });
  }
}