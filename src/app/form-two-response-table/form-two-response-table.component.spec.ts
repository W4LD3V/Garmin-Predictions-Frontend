import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTwoResponseTableComponent } from './form-two-response-table.component';

describe('FormTwoResponseTableComponent', () => {
  let component: FormTwoResponseTableComponent;
  let fixture: ComponentFixture<FormTwoResponseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTwoResponseTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTwoResponseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
