import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityConfigComponent } from './security-config.component';

describe('SecurityConfigComponent', () => {
  let component: SecurityConfigComponent;
  let fixture: ComponentFixture<SecurityConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
