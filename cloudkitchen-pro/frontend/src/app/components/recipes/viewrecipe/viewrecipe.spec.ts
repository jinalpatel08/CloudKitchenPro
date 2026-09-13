import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewrecipe } from './viewrecipe';

describe('Viewrecipe', () => {
  let component: Viewrecipe;
  let fixture: ComponentFixture<Viewrecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewrecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewrecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
