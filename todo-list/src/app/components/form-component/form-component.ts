import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Task, TaskService } from '../../services/task-service';
import { time } from 'console';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-component.html',
  styleUrl: './form-component.css',
})
export class FormComponent implements AfterViewInit, OnInit {
  tasks: Task[] = [];
  private taskService = inject(TaskService);
  myForm: FormGroup;
  state: 'edit' | 'add' = 'add';
  stateButtonText: string = "Add";
  ngOnInit() {
    this.taskService.tasks$.subscribe(t => {
      this.tasks = t;
    });
    this.myForm.markAsTouched();
  }
  editingTaskId: number = -1;
  ngAfterViewInit() {
    this.taskService.selectedTask$.subscribe(id => {
      if (id) {
        this.myForm.controls['task'].setValue(this.tasks.find(t => t.id === id)?.content);
        this.state = 'edit';
        this.stateButtonText = "Edit";
        this.editingTaskId = id;
      }
    });
  }
  generate4DigitUnique(): number {
    const random = Math.floor(Math.random() * 100);
    const time = Date.now() % 100;
    return (time * 100) + random;
  }
  getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: new FormControl(-1, []),
      task: new FormControl("", Validators.required)
    });
  }

  onAdd() {
    // if(!this.myForm.controls['id'].value){

    this.myForm.controls['id'].setValue(this.generate4DigitUnique());
    const task = {
      id: this.myForm.controls['id'].value,
      content: this.myForm.controls['task'].value,
      createdOn: this.getCurrentDateTime()
    }
    this.taskService.addTask(task);
    this.myForm.controls['id'].setValue(null);
    this.myForm.controls['task'].setValue(null);
    // }
    //else{
    // console.log('editing');
    // this.taskService.deleteTask(this.myForm.controls['id'].value);
    // this.tasks = this.tasks.filter(t=> t.id != this.myForm.controls['id'].value);
    // const task = {
    //   id: this.myForm.controls['id'].value,
    //   content: this.myForm.controls['task'].value,
    //   createdOn: this.getCurrentDateTime()
    // }
    // this.tasks.push(task);
    // this.taskService.addTask(task);
    // this.myForm.controls['id'].setValue(null);
    // this.myForm.controls['task'].setValue(null);
    // }
  }
  putValue() {
    const task = {
      id: this.editingTaskId,
      content: this.myForm.controls['task'].value,
      createdOn: this.getCurrentDateTime()
    }
    this.taskService.putTask(task);
    this.editingTaskId = -1;
    this.myForm.controls['id'].setValue(null);
    this.myForm.controls['task'].setValue(null);
    this.state = "add";
    this.stateButtonText = "Add";
  }
  enterPressed(){
    if(this.myForm.invalid || !this.myForm.touched) return
    this.state=="edit" ? this.putValue() : this.onAdd();
  }
}