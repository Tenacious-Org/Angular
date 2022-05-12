import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterMyawardsComponent } from './requester-myawards.component';

describe('RequesterMyawardsComponent', () => {
  let component: RequesterMyawardsComponent;
  let fixture: ComponentFixture<RequesterMyawardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterMyawardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterMyawardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
