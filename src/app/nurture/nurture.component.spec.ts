import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurtureComponent } from './nurture.component';

describe('NurtureComponent', () => {
  let component: NurtureComponent;
  let fixture: ComponentFixture<NurtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
