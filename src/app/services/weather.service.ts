import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl =
    'https://my-app-20250411-01-hhhhhxckh3hugebx.japaneast-01.azurewebsites.net/weatherforecast';

  constructor(private http: HttpClient) {}

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl);
  }
}
