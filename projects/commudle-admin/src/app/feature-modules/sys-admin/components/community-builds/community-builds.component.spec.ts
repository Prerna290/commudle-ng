import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBuildsComponent } from './community-builds.component';

describe('CommunityBuildsComponent', () => {
  let component: CommunityBuildsComponent;
  let fixture: ComponentFixture<CommunityBuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
