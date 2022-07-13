import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPublishComponent } from './hr-publish.component';

describe('HrPublishComponent', () => {
  let component: HrPublishComponent;
  let fixture: ComponentFixture<HrPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
