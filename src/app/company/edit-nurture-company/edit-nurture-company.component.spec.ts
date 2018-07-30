import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNurtureCompanyComponent } from './edit-nurture-company.component';

describe('EditNurtureCompanyComponent', () => {
  let component: EditNurtureCompanyComponent;
  let fixture: ComponentFixture<EditNurtureCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNurtureCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNurtureCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
