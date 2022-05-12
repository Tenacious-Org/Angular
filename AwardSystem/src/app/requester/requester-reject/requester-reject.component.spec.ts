import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterRejectComponent } from './requester-reject.component';

describe('RequesterRejectComponent', () => {
  let component: RequesterRejectComponent;
  let fixture: ComponentFixture<RequesterRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
