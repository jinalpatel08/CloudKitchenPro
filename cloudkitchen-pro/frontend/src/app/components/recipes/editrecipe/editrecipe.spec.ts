import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editrecipe } from './editrecipe';

describe('Editrecipe', () => {
  let component: Editrecipe;
  let fixture: ComponentFixture<Editrecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editrecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editrecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
