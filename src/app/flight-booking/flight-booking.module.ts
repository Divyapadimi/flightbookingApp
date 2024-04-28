import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule ,
    FlightBookingRoutingModule
  ],providers: [DatePipe]
})
export class FlightBookingModule { }
