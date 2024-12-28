import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface TrainResponse {
  years_trained: number[];
}

@Component({
  selector: 'app-form-step-one',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-step-one.component.html',
  styleUrls: ['./form-step-one.component.css']
})
export class FormStepOneComponent {
  selectedFile: File | null = null;
  isStepOneCompleted = false;
  years_trained: Array<number> = [];

  @Output() stepCompleted = new EventEmitter<boolean>();
  @Output() yearsTrained = new EventEmitter<number[]>();

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    console.log('File selection triggered');
    const file: File = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      this.selectedFile = file;
    } else {
      console.log('No file selected in onFileSelected()');
    }
  }

  onSubmit() {
    console.log('Form submit triggered');
    if (this.selectedFile) {
      console.log('File ready to upload:', this.selectedFile);
      const formData = new FormData();
      formData.append('csv_file', this.selectedFile);

      this.http.post<TrainResponse>('http://localhost:8000/train/', formData).subscribe({
        next: (response) => {
          console.log('Upload Success', response);
          this.isStepOneCompleted = true; 
          this.stepCompleted.emit(true);

          // Emit years_trained array to the parent component
          if (response.years_trained) {
            this.years_trained = response.years_trained;
            this.yearsTrained.emit(this.years_trained);
          }
        },
        error: (error) => {
          console.error('Error occurred while uploading file', error);
        },
        complete: () => {
          console.log('Upload completed');
        }
      });
    } else {
      console.warn('No file selected!');
    }
  }
}
