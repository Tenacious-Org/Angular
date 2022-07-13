import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCommentsComponent } from './more-comments.component';

describe('MoreCommentsComponent', () => {
  let component: MoreCommentsComponent;
  let fixture: ComponentFixture<MoreCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
