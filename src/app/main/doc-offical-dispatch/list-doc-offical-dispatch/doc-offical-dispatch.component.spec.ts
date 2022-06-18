import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocOfficalDispatchComponent } from './doc-offical-dispatch.component';

describe('DocOfficalDispatchComponent', () => {
  let component: DocOfficalDispatchComponent;
  let fixture: ComponentFixture<DocOfficalDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocOfficalDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocOfficalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
