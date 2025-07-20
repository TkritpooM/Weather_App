import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCoords(city: string): Observable<{latitude: number, longitude: number} | null> {
    if (!city.trim()) return of(null);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;

    return this.http.get<any[]>(url).pipe(
      map(results => results.length ? {
        latitude: parseFloat(results[0].lat),
        longitude: parseFloat(results[0].lon)
      } : null)
    );
  }

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get(url);
  }

  getWeatherByCity(city: string): Observable<any> {
    return this.getCoords(city).pipe(
      switchMap(coords => coords ? this.getWeather(coords.latitude, coords.longitude) : of(null))
    );
  }
}
