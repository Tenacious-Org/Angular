import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardViewComponent } from './award-view.component';

describe('AwardViewComponent', () => {
  let component: AwardViewComponent;
  let fixture: ComponentFixture<AwardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
