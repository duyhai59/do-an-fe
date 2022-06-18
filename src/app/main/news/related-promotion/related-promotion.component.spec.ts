import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPromotionComponent } from './related-promotion.component';

describe('RelatedPromotionComponent', () => {
  let component: RelatedPromotionComponent;
  let fixture: ComponentFixture<RelatedPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
