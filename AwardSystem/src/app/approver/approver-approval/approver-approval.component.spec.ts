import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverApprovalComponent } from './approver-approval.component';

describe('ApproverApprovalComponent', () => {
  let component: ApproverApprovalComponent;
  let fixture: ComponentFixture<ApproverApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
