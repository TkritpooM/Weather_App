import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  error: string = '';
  loading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    this.error = '';
    this.weatherData = null;

    const cityTrim = this.city.trim();
    if (!cityTrim) {
      this.error = 'Please enter a city name';
      return;
    }

    if (!/^[a-zA-Z\s,]+$/.test(cityTrim)) {
      this.error = 'Please enter a valid city name (letters, spaces, commas only)';
      return;
    }

    this.loading = true;

    this.weatherService.getWeatherByCity(cityTrim).subscribe({
      next: (data) => {
        this.loading = false;
        if (data && data.current_weather) {
          this.weatherData = data.current_weather;
        } else {
          this.error = 'No data found for this city';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error fetching weather data';
        console.error('Weather API error:', err);
      }
    });
  }
}
