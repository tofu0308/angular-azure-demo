import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { WeatherService, WeatherForecast } from './services/weather.service';
import { MemoListComponent } from './components/memo-list/memo-list.component';

@Component({
  selector: 'app-root',
  imports: [NgFor, MemoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-azure-demo';

  forecasts: WeatherForecast[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getForecast().subscribe((data) => {
      this.forecasts = data;
    });
  }
}
