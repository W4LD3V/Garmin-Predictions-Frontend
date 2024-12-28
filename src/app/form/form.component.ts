import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  selectedFile: File | null = null;

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
  

  onSubmit(event: any) {
    console.log('Form submit triggered');
    if (this.selectedFile) {
      console.log('File ready to upload:', this.selectedFile);
      const formData = new FormData();
      formData.append('csv_file', this.selectedFile);
  
      this.http.post('http://localhost:8000/train/', formData).subscribe({
        next: (response) => {
          console.log('Upload Success', response);
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
