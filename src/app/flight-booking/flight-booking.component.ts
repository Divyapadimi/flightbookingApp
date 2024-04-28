import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BookingService } from '../Services/booking.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


interface Column {
  field: string;
  header: string;
}


@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [TableModule, FormsModule, ReactiveFormsModule,
    NgbDropdownModule, DropdownModule, InputIconModule, IconFieldModule,
    InputTextModule,NgxSpinnerModule,
    CalendarModule],
  providers: [DatePipe],
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.scss'
})


export class FlightBookingComponent {
  products: any[] = [];
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  emptymessage = "Loading...";
  filterList: any;
  selectedfilter: number = 0;
  date: any;
  formattedDate: string = '';
  subOptions: string[] = [];
  subOption: string | null = null;
  showSecondDropdown: boolean = false
  firstDropdownOptions: any[] | undefined;
  secondDropdownOptions: any[] | undefined;
  selectedFirstOption: any;
  selectedSecondOption: any;
  cols!: Column[];


  constructor(private bookingService: BookingService,
    private datePipe: DatePipe,
    private ngxSpinnerService:NgxSpinnerService) { }

  ngOnInit() {
    this.firstDropdownOptions = [
      { label: 'Airline', value: 'option1' },
      { label: 'Class', value: 'option2' },
    ];

    this.getAllFlights();
  }

  getAllFlights() {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  search(event: any) {
    if (event.keyCode == 13 || event.type == 'click' || event.target.value == '') {
      if (this.searchText == '') {
        this.getAllFlights();
      }
      else {
        const searchText = this.searchText.toLowerCase().trim();
        this.products = this.products.filter(product =>
          (product.origin && product.origin.toLowerCase().includes(searchText)) ||
          (product.destination && product.destination.toLowerCase().includes(searchText))
        );
        if (this.products.length == 0) {
          this.emptymessage = "No Records found";
        }
      }
    }
  }

  onChange(event: any) {
    this.selectedfilter = event.value;
    if (this.selectedfilter) {
      this.bookingService.getAllBookings().pipe(
        map((res: any[]) => res.filter(product => product.airline === this.selectedfilter || product.class === this.selectedfilter))
      ).subscribe((response: any[]) => {
        this.products = response;
        if (this.products.length == 0) {
          this.emptymessage = "No Records found";
        }
      });
    } else {
      this.getAllFlights();
    }
  }

  sort(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.products.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      if (order === 'asc') {
        return priceA - priceB; // Sort by ascending price
      } else {
        return priceB - priceA; // Sort by descending price
      }
      
    });
  }

  onSelect(event: any) {
    this.date = this.datePipe.transform(event, 'dd/MM/yyyy');
    if (this.date) {
      this.bookingService.getAllBookings().pipe(
        map((res: any[]) => res.filter(product => this.compareDates(product.arrivalTime))) ).subscribe((response: any[]) => {
        this.products = response;
        if (this.products.length == 0) {
          this.emptymessage = "No Records found";
        }
      });
    }
  }

  compareDates(arrivalTime: string): boolean {
    // Convert arrivalTime to dd/MM/yyyy format for comparison
    const formattedArrivalTime = this.datePipe.transform(arrivalTime, 'dd/MM/yyyy');
    return formattedArrivalTime === this.date;
  }

  onClear() {
    this.searchText = '';
    this.emptymessage = "Loading...";
    this.selectedfilter = 0;
    this.date = '';
    this.showSecondDropdown = false;
    this.selectedSecondOption = null;
    this.selectedFirstOption = null;
    this.getAllFlights();
  }

  updateSecondDropdownOptions() {
    this.showSecondDropdown = true;
    this.selectedSecondOption = null;
    if (this.selectedFirstOption === 'option1') {
      this.secondDropdownOptions = [
        { label: 'IndiGo', value: 'IndiGo', },
        { label: 'Air India', value: 'Air India', },
        { label: 'SpiceJet', value: 'SpiceJet', },
        { label: 'Vistara', value: 'Vistara', },
        { label: 'GoAir', value: 'GoAir', },
        { label: 'AirAsia', value: 'AirAsia', }
      ];
    } else if (this.selectedFirstOption === 'option2') {
      this.secondDropdownOptions = [
        { label: 'Economy', value: 'Economy' },
        { label: 'Business', value: 'Business', },
        { label: 'First Class', value: 'First Class', },
        { label: 'Private', value: 'Private', }
      ];
    } else {
      this.secondDropdownOptions = [];
    }
  }



}
