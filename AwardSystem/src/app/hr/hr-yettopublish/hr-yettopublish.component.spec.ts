import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrYettopublishComponent } from './hr-yettopublish.component';

describe('HrYettopublishComponent', () => {
  let component: HrYettopublishComponent;
  let fixture: ComponentFixture<HrYettopublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrYettopublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrYettopublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
