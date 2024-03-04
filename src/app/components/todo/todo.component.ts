import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  constructor(private todoService: TodoService){}

  $todoList!: Observable<ToDo[]>

  ngOnInit(){
    this.$todoList = this.todoService.getTodos();
  }

  updatedTodo(event:ToDo){
    this.todoService.updateTodo(event._id, event).subscribe(res => {
      if(res){
        this.$todoList = this.todoService.getTodos();
      }
    })
  }

  createdTodo(event:ToDo){
    this.todoService.createTodo(event).subscribe(res => {
      if(res){
        this.$todoList = this.todoService.getTodos();
      }
    })
  }

  deletedTodo(event:ToDo){
    this.todoService.deleteTodo(event._id).subscribe(res => {
      if(res){
        this.$todoList = this.todoService.getTodos();
      }
    })
  }


}
