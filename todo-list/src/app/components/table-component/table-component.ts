import { Component, inject, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
import { Task, TaskService } from '../../services/task-service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-table-component',
  imports: [CommonModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.css',
})
export class TableComponent implements OnInit {
  toggleViaIcon(id: number) {
    this.taskService.toggleTask(id);
  }
  get doneTasks(){
    return this.tasks.filter(t=> t.done==true);
  }
  get undoneTasks(){
    return this.tasks.filter(t=> (t.done==false || t.done == null));
  }
  tasks: Task[] = [];
  private taskService = inject(TaskService);
  ngOnInit(): void {
    this.taskService.tasks$.subscribe(t => {
      console.log('new tasks arived to grid');
      this.tasks = t;
    });
  }
  onEdit(id: number) {
    console.log('id:', id);
    //this.taskService.onEdit(id);
    this.taskService.setSelectedTask(id);

  }
  onDelete(id: number) {
    this.taskService.deleteTask(id);
  }
  isSelected(id:number){
    if(this.tasks.find(t => t.id===id)?.done==true){
      return true;
    }
    else{
      return false;
    } 
  }
}
