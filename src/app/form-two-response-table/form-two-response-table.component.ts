import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PredictionResult {
  distance_title: string;
  distance: number;
  predicted_pace: string;
  finish_time: string;
  applied_hr: number;
}

type PredictionCategories = {
  'Sprint Distances': PredictionResult[];
  'Middle Distances': PredictionResult[];
  'Long Distances': PredictionResult[];
  'Ultra Distances': PredictionResult[];
};

@Component({
  selector: 'app-form-two-response-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-two-response-table.component.html',
  styleUrls: ['./form-two-response-table.component.css']
})
export class FormTwoResponseTableComponent {
  @Input() jsonResponseData: PredictionCategories | null = null;

  getCategories(): Array<keyof PredictionCategories> {
    return ['Sprint Distances', 'Middle Distances', 'Long Distances', 'Ultra Distances'];
  }
}
