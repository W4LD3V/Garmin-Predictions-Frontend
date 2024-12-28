import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-step-two',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-step-two.component.html',
  styleUrls: ['./form-step-two.component.css']
})
export class FormStepTwoComponent {
  hrMax: number | null = null;
  zones: number[] = [];
  selectedYear: number | null = null;

  @Output() jsonResponse = new EventEmitter<any>();
  @Input() years_trained: number[] = []; 

  constructor(private http: HttpClient) {}

  calculateZones(event: Event) {
    event.preventDefault();
    if (this.hrMax !== null && this.hrMax > 0) {
      this.zones = [
        Math.round(this.hrMax * 0.65),
        Math.round(this.hrMax * 0.75),
        Math.round(this.hrMax * 0.8),
        Math.round(this.hrMax * 0.85),
        Math.round(this.hrMax * 0.9)
      ];
      console.log('HR zones calculated:', this.zones);
    } else {
      console.warn('Invalid HR Max input.');
    }
  }

  submitHRMax() {
    console.log('Submitting HR Max and year:', this.hrMax, this.selectedYear, this.zones);
    if (this.hrMax !== null && this.selectedYear !== null && this.zones.length > 0) {
      const requestBody = {
        year: this.selectedYear,
        zones: {
          'Sprint Distances': this.zones[3],
          'Middle Distances': this.zones[2],
          'Long Distances': this.zones[1],
          'Ultra Distances': this.zones[0]
        }
      };
  
      this.http.post('http://localhost:8000/predict/', requestBody).subscribe({
        next: (response) => {
          console.log('HR zones and year sent successfully', response);
          this.jsonResponse.emit(response);
        },
        error: (error) => {
          console.error('Error occurred while sending HR zones and year', error);
        },
        complete: () => {
          console.log('HR zones and year submission completed');
        }
      });
    } else {
      console.warn('Invalid input: ensure HR Max, selected year, and zones are set.');
    }
  }  
}
