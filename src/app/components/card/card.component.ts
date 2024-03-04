import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input()
  headerTitle!:string;

  @Input()
  todo!:ToDo;

  @Input()
  purpose!: 'create' | 'display' | 'edit' | 'delete';

  @Output()
  updatedTodo = new EventEmitter<ToDo>();

  @Output()
  createdTodo = new EventEmitter<ToDo>();

  @Output()
  deletedTodo = new EventEmitter<ToDo>();


  buttons = [
    {
      'name': 'Create',
      'purpose': 'create',
    },
    {
      'name': 'Edit',
      'purpose': 'display',
    },
    {
      'name': 'Delete',
      'purpose': 'display',
    },
    {
      'name': 'Done',
      'purpose': 'display',
    },
    {
      'name': 'Cancel',
      'purpose': 'edit',
    },
    {
      'name': 'Save',
      'purpose': 'edit',
    },
    {
      'name': 'No',
      'purpose': 'delete',
    },
    {
      'name': 'Yes',
      'purpose': 'delete',
    },
  ]

  todoForm!: FormGroup;

  ngOnInit(){
    this.todoForm = new FormGroup({
      title: new FormControl(this.todo?.title ?? '', Validators.required)
    });
  }

  checkEdit(event:boolean){
    this.purpose = event ? 'edit' : 'display';
  }

  getSavedForm(event: FormGroup){
    this.updatedTodo.next({...this.todo, title: event.value.title})
  }

  getCreatedForm(event: FormGroup){
    this.createdTodo.next({isCompleted: false, ...event.value});
  }

  checkDelete(event:boolean){
    this.purpose = event ? 'delete' : 'display';
  }

  confirmDelete(){
    this.deletedTodo.next(this.todo);
  }

  checkDone(event:boolean){
    this.updatedTodo.next({...this.todo, isCompleted: event})
  }


}
