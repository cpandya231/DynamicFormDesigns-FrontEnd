import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchTowerComponent } from './watch-tower.component';

describe('WatchTowerComponent', () => {
  let component: WatchTowerComponent;
  let fixture: ComponentFixture<WatchTowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchTowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
