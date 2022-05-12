import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterViewComponent } from './requester-view.component';

describe('RequesterViewComponent', () => {
  let component: RequesterViewComponent;
  let fixture: ComponentFixture<RequesterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
