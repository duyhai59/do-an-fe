import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedDocumentComponent } from './related-document.component';

describe('RelatedDocumentComponent', () => {
  let component: RelatedDocumentComponent;
  let fixture: ComponentFixture<RelatedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
