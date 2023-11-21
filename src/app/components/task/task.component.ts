import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnDestroy {
  id: number = 1;
  darkMode: boolean = false;
  username: string = 'Mario';
  newTask: string = '';
  newTaskUrgency: 'low' | 'medium' | 'high' = 'low';
  tasks: Array<{ id: number, title: string, completed: boolean, urgency: 'low' | 'medium' | 'high' }> = [
    { id: 1, title: 'Clean the kitchen', completed: false, urgency: 'low' },
    { id: 2, title: 'Clean the bathroom', completed: false, urgency: 'medium' },
    { id: 3, title: 'Clean the living room', completed: false, urgency: 'high' },
    { id: 4, title: 'Do the laundry', completed: false, urgency: 'low' },
    { id: 5, title: 'Buy groceries', completed: false, urgency: 'medium' },
    { id: 6, title: 'Prepare dinner', completed: false, urgency: 'high' }
  ];
  private subscription!: Subscription;
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscription = this.themeService.darkMode$.subscribe(value => {
      this.darkMode = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  completeTask(task: { id: number, title: string, completed: boolean }) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  addTask() {
    if (this.newTask) {
      this.tasks.push({
        id: this.id,
        title: this.newTask,
        completed: false,
        urgency: this.newTaskUrgency
      });
      this.newTask = '';
      this.newTaskUrgency = 'low';
      this.id++;

    }
  }
}
