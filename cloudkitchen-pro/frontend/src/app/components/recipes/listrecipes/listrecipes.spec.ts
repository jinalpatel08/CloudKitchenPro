import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listrecipes } from './listrecipes';

describe('Listrecipes', () => {
  let component: Listrecipes;
  let fixture: ComponentFixture<Listrecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listrecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listrecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
