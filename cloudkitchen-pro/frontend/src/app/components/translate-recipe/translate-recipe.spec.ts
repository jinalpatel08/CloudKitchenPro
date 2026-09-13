import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateRecipe } from './translate-recipe';

describe('TranslateRecipe', () => {
  let component: TranslateRecipe;
  let fixture: ComponentFixture<TranslateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
