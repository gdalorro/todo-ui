import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

    @Input()
    name!:string;

    @Input()
    form!:FormGroup;

    @Input()
    todo!:any;

    @Output()
    isEdit = new EventEmitter<boolean>();

    @Output()
    isDelete = new EventEmitter<boolean>();

    @Output()
    isDone = new EventEmitter<boolean>();

    @Output()
    savedForm = new EventEmitter<FormGroup>();

    @Output()
    createdForm = new EventEmitter<FormGroup>();

    @Output()
    confirmDelete = new EventEmitter<boolean>();



    protected getButtonClass(){
      return {
        'btn-primary': this.name && (this.name.toLowerCase() === 'create' || this.name.toLowerCase() === 'save' || this.name.toLowerCase() === 'yes'),
        'btn-success': this.name && this.name.toLowerCase() === 'done',
        'btn-danger': this.name && this.name.toLowerCase() === 'delete',
        'btn-warning': this.name && this.name.toLowerCase() === 'edit',
        'btn-secondary': this.name && (this.name.toLowerCase() === 'cancel' || this.name.toLowerCase() === 'no' || this.name.toLowerCase() === 'undone')
      }
    }

    clickFunction(name:string){
      switch(name.toLowerCase()){
        case 'create':
          this.createTodo();
          break;
        case 'edit':
          this.editTodo(true);
          break;
        case 'delete':
          this.deleteTodo(true);
          break;
        case 'done':
          this.doneTodo(true);
          break;
        case 'undone':
          this.doneTodo(false);
          break;
        case 'save':
          this.saveEditedTodo();
          break;
        case 'cancel':
          this.editTodo(false);
          break;
        case 'yes':
          this.confirmDeleteTodo();
          break;
        case 'no':
          this.deleteTodo(false);
          break;
      }

    }

    createTodo(){
      this.createdForm.next(this.form);
      this.form.reset();
    }

    editTodo(value:boolean){
      this.isEdit.next(value);
    }

    saveEditedTodo(){
      this.editTodo(false);
      this.savedForm.next(this.form);
    }

    deleteTodo(value:boolean){
      this.isDelete.next(value);
    }

    confirmDeleteTodo(){
      this.deleteTodo(false);
      this.confirmDelete.next(true);
    }

    disableButton(){
      return (this.form.invalid && (this.name.toLowerCase() === 'create' || this.name.toLowerCase() === 'save')) || 
      (this.name.toLowerCase() === 'edit' && this.todo?.isCompleted);
    }

    doneTodo(value:boolean){
      this.isDone.next(value);
    }

}
