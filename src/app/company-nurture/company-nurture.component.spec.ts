import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNurtureComponent } from './company-nurture.component';

describe('CompanyNurtureComponent', () => {
  let component: CompanyNurtureComponent;
  let fixture: ComponentFixture<CompanyNurtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNurtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNurtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
