import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Client {
  id: number;
  name: string;
  email: string;
}

export interface Premium {
  id: number;
  title: string;
  startDate: string; // ou Date
  endDate: string;   // ou Date
  clientId: number;
  client: Client;
}
// ---------------------------------


@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  // API C#
  private apiUrl = 'http://localhost:5095/api/premiums';

  
  constructor(private http: HttpClient) { }

  
  public getPremiums(): Observable<Premium[]> {
    
    return this.http.get<Premium[]>(this.apiUrl);
  }
  public addPremium(premium: any): Observable<Premium> {
    
    return this.http.post<Premium>(this.apiUrl, premium);
  }
  public deletePremium(id: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  public updatePremium(id: number, premium: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, premium);
  }

  
}