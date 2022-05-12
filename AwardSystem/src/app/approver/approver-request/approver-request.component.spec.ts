import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverRequestComponent } from './approver-request.component';

describe('ApproverRequestComponent', () => {
  let component: ApproverRequestComponent;
  let fixture: ComponentFixture<ApproverRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
