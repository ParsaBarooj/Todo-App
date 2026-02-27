import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  tasks: Task[] = [];
  ngOnInit() {
    this.tasksSubject.next(this.tasks);
  }
  addTask(task: Task) {

    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);

  }
  deleteTask(id: number) {
    this.tasks.forEach(el => {
      if (id == el.id) {
        this.tasks = this.tasks.filter(t => t.id != el.id);
      }

    });
    this.tasksSubject.next(this.tasks);
  }
  setSelectedTask(id: number) {
    this.selectedTaskSubject.next(id);

  }
  putTask(task: Task) {
    this.tasks.forEach(el => {
      if(el.id === task.id){
        el.content = task.content;
        el.createdOn = task.createdOn;
      }
    });
    this.tasksSubject.next(this.tasks)
    this.selectedTaskSubject.next(null);
  }
  toggleTask(id: number) {
    this.tasks.forEach(el => {
      if (el.id === id) {
        if (el.done != null) {
          el.done = !el.done;
        } else {
          el.done = true;
        }
      }
    });
    this.tasksSubject.next(this.tasks);
  }
  // onEdit(id:number){
  //   this.tasks.

  // }
  // getTasks(){
  //   return this.tasks;
  // }
  tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  selectedTaskSubject = new BehaviorSubject<number | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();
}
export interface Task {
  id: number;
  content: string;
  createdOn: string;
  done?: boolean;
}
