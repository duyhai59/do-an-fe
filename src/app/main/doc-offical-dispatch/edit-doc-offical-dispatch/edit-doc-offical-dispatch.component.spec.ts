import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocOfficalDispatchComponent } from './edit-doc-offical-dispatch.component';

describe('EditDocOfficalDispatchComponent', () => {
  let component: EditDocOfficalDispatchComponent;
  let fixture: ComponentFixture<EditDocOfficalDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDocOfficalDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocOfficalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
