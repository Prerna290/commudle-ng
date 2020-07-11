import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSimpleRegistrationComponent } from './event-simple-registration.component';

describe('EventSimpleRegistrationComponent', () => {
  let component: EventSimpleRegistrationComponent;
  let fixture: ComponentFixture<EventSimpleRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSimpleRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSimpleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
