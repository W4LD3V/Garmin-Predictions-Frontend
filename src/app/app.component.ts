import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormStepOneComponent } from './form-step-one/form-step-one.component';
import { FormStepTwoComponent } from './form-step-two/form-step-two.component';
import { FormTwoResponseTableComponent } from './form-two-response-table/form-two-response-table.component';

// Structure for a single prediction result
interface PredictionResult {
  distance_title: string;
  distance: number;
  predicted_pace: string;
  finish_time: string;
  applied_hr: number;
}

// Structure for categorized prediction data
type PredictionCategories = {
  'Sprint Distances': PredictionResult[];
  'Middle Distances': PredictionResult[];
  'Long Distances': PredictionResult[];
  'Ultra Distances': PredictionResult[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormStepOneComponent, FormStepTwoComponent, FormTwoResponseTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'garmin-angular-app';
  isStepOneCompleted = false;
  years_trained: number[] = [];

  jsonResponseData: PredictionCategories = {
    'Sprint Distances': [],
    'Middle Distances': [],
    'Long Distances': [],
    'Ultra Distances': []
  };

  handleJsonResponse(response: any) {
    console.log('Received JSON response:', response);
    this.jsonResponseData = response.predictions || {
      'Sprint Distances': [],
      'Middle Distances': [],
      'Long Distances': [],
      'Ultra Distances': []
    };
  }

  handleYearsTrained(years: number[]) {
    console.log('Years trained received:', years);
    this.years_trained = years;
  }
  
  hasData(data: PredictionCategories): boolean {
    return Object.values(data).some(category => category.length > 0);
  }
}
