// angular import
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, } from '@angular/common/http';
import { BookingService } from './Services/booking.service';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
  ],
  providers: [BookingService]
})
export class AppModule {}
