import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-step-two',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-step-two.component.html',
  styleUrls: ['./form-step-two.component.css']
})
export class FormStepTwoComponent {
  hrValue: number | null = null;

  constructor(private http: HttpClient) {}

  onHRSelected(event: any) {
    console.log('HR selected:', event.target.value);
    this.hrValue = event.target.value;
  }

  onSubmit() {
    console.log('Form submit triggered');
    if (this.hrValue !== null) {
      console.log('Form ready to submit:', this.hrValue);
      const formData = new FormData();
      formData.append('heart_rate', this.hrValue.toString());

      this.http.post('http://localhost:8000/predict/', formData).subscribe({
        next: (response) => {
          console.log('Upload Success', response);
        },
        error: (error) => {
          console.error('Error occurred while uploading data', error);
        },
        complete: () => {
          console.log('Upload completed');
        }
      });
    } else {
      console.warn('No heart rate provided!');
    }
  }
}
