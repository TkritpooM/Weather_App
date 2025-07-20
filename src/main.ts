import { bootstrapApplication } from '@angular/platform-browser';
import { WeatherComponent } from './app/weather/weather.component';
import { appConfig } from './app/app.config';

bootstrapApplication(WeatherComponent, appConfig)
  .catch(err => console.error(err));
