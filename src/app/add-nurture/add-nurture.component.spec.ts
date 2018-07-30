import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurtureComponent } from './add-nurture.component';

describe('AddNurtureComponent', () => {
  let component: AddNurtureComponent;
  let fixture: ComponentFixture<AddNurtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNurtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNurtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
