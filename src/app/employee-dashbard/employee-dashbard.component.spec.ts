import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashbardComponent } from './employee-dashbard.component';

describe('EmployeeDashbardComponent', () => {
  let component: EmployeeDashbardComponent;
  let fixture: ComponentFixture<EmployeeDashbardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDashbardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDashbardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
