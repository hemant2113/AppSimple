import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNurtureComponent } from './edit-nurture.component';

describe('EditNurtureComponent', () => {
  let component: EditNurtureComponent;
  let fixture: ComponentFixture<EditNurtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNurtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNurtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
