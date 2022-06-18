import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocOfficalDispatchComponent } from './upload-doc-offical-dispatch.component';

describe('UploadDocOfficalDispatchComponent', () => {
  let component: UploadDocOfficalDispatchComponent;
  let fixture: ComponentFixture<UploadDocOfficalDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocOfficalDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocOfficalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
