import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterHomepageComponent } from './requester-homepage.component';

describe('RequesterHomepageComponent', () => {
  let component: RequesterHomepageComponent;
  let fixture: ComponentFixture<RequesterHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
