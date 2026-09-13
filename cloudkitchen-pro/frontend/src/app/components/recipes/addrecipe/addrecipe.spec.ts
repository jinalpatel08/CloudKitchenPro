import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addrecipe } from './addrecipe';

describe('Addrecipe', () => {
  let component: Addrecipe;
  let fixture: ComponentFixture<Addrecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addrecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addrecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
