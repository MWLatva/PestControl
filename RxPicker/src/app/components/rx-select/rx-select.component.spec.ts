import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxSelectComponent } from './rx-select.component';

describe('RxSelectComponent', () => {
  let component: RxSelectComponent;
  let fixture: ComponentFixture<RxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
