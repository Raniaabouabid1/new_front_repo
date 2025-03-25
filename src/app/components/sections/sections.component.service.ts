import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Section {
  id: number;
  name: string;
  coordinates: string;
}
@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = 'http://localhost:8080/api/sections';

  constructor(private http: HttpClient) {
  }
  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.apiUrl);
  }
}
