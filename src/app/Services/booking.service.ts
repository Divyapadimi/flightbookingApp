import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

 constructor(private http: HttpClient) { }

  getAllBookings() {
    return this.http.get<any>('https://api.npoint.io/378e02e8e732bb1ac55b').pipe(map((res: any) => {
      if(res){
        const flightdata = res.map((flight: any) => ({ ...flight, class: this.getRandomClass() }))
        return flightdata;
      }
    }))
  }

  getRandomClass(): string {
    const flightClasses = ['Economy', 'Business', 'First Class', 'Private'];
    const randomIndex = Math.floor(Math.random() * flightClasses.length);// Generate random index
    return flightClasses[randomIndex];// Retrieve random flight class
  }
}
