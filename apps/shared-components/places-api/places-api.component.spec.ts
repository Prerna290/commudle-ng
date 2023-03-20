import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesApiComponent } from './places-api.component';

describe('PlacesApiComponent', () => {
  let component: PlacesApiComponent;
  let fixture: ComponentFixture<PlacesApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacesApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
