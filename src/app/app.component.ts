import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from './state/state.interface';
import { completeToDos, incompleteToDos } from './state/todo';
import {
  AddToDo,
  CompleteToDo,
  IncompleteToDo
} from './state/todo/todo.actions';
import { generateToDos, ToDo } from './state/todo/todo.model';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(TodoFormComponent) child: TodoFormComponent;

  completeToDos: Observable<Array<ToDo>>;

  incompleteToDos: Observable<Array<ToDo>>;

  public _toDo: Partial<ToDo>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    generateToDos().forEach(todo => this.store.dispatch(new AddToDo(todo)));
    this.completeToDos = this.store.pipe(map(completeToDos));
    this.incompleteToDos = this.store.pipe(map(incompleteToDos));
  }

  addToDo() {
    this.store.dispatch(
      new AddToDo({
        id: Math.random(),
        complete: false,
        task: this._toDo.task
      })
    );
    this.child.task.reset();
  }

  onAddToDoChange(e) {
    this._toDo = e;
  }

  onCompleteToDo(toDo: ToDo) {
    this.store.dispatch(new CompleteToDo(toDo));
  }

  onIncompleteToDo(toDo: ToDo) {
    this.store.dispatch(new IncompleteToDo(toDo));
  }
}
