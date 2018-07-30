import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurtureViewComponent } from './nurture-view.component';

describe('NurtureViewComponent', () => {
  let component: NurtureViewComponent;
  let fixture: ComponentFixture<NurtureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurtureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurtureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
