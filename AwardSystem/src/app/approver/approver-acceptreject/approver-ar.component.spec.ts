import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverARComponent } from './approver-ar.component';

describe('ApproverARComponent', () => {
  let component: ApproverARComponent;
  let fixture: ComponentFixture<ApproverARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverARComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
