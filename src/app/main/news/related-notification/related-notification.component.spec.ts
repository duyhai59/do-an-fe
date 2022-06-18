import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedNotificationComponent } from './related-notification.component';

describe('RelatedNotificationComponent', () => {
  let component: RelatedNotificationComponent;
  let fixture: ComponentFixture<RelatedNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
