import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterAddRequestComponent } from './requester-add-request.component';

describe('RequesterAddRequestComponent', () => {
  let component: RequesterAddRequestComponent;
  let fixture: ComponentFixture<RequesterAddRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterAddRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterAddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
