import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { ThemeService } from './services/theme-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  darkMode : boolean = false;
  title = 'ToDoList';
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
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
