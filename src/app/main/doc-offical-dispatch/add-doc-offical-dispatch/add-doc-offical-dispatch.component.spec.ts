import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocOfficalDispatchComponent } from './add-doc-offical-dispatch.component';

describe('AddDocOfficalDispatchComponent', () => {
  let component: AddDocOfficalDispatchComponent;
  let fixture: ComponentFixture<AddDocOfficalDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocOfficalDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocOfficalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
