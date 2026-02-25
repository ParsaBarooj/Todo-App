import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./components/form-component/form-component";
import { TableComponent } from "./components/table-component/table-component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormComponent, TableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list');
}
