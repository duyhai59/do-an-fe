import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsConfigComponent } from './tags-config.component';

describe('TagsConfigComponent', () => {
  let component: TagsConfigComponent;
  let fixture: ComponentFixture<TagsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
