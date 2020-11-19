import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactDTO } from 'src/models/ContactDTO.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private readonly http: HttpClient) {}

  public sendContactForm(formDTO: ContactDTO): Observable<any> {
    const URL = `${API_URL}/contact-us`;
    return this.http.post<any>(URL, { ...formDTO });
  }
}
