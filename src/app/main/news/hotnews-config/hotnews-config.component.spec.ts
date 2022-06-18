import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotnewsConfigComponent } from './hotnews-config.component';

describe('HotnewsConfigComponent', () => {
  let component: HotnewsConfigComponent;
  let fixture: ComponentFixture<HotnewsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotnewsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotnewsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
